# farkistan-pw-client-app

React client for a Politics & War Discord community. Players sign in with Discord through
Auth0 and link their in-game nation to their Discord identity.

Front end of a three-repo system:

| | |
|---|---|
| **farkistan-pw-client-app** *(this repo)* | React client |
| **[farkapi](https://github.com/martip23/farkapi)** | GraphQL API |
| **[benderts](https://github.com/martip23/benderts)** | Discord bot |

---

## Stack

- **React 18** + **TypeScript**
- **Apollo Client 3** — GraphQL
- **Auth0** (`@auth0/auth0-react`) — Discord as the upstream identity provider
- **MUI 5** with a custom theme
- **React Router 6**
- Docker, multi-stage build

## Architecture

### Auth and the Apollo link

The piece worth reading is `src/Auth/ApolloProviderWrapper.tsx`. `ApolloProvider` is nested
inside `Auth0Provider` so the client can reach the token, and an Apollo **`setContext` link**
attaches it to every outgoing request:

```
Auth0Provider
  └── ApolloProviderWrapper     getAccessTokenSilently() → authLink → httpLink
        └── ThemeProvider
              └── Template      routes
```

The token is pulled with `getAccessTokenSilently()` once the user is authenticated, held in
state, and concatenated onto the HTTP link as `Authorization: Bearer <token>`. The API
([farkapi](https://github.com/martip23/farkapi)) verifies that token against Auth0's JWKS
endpoint and provisions the user on first request — so a new player exists in the database
from their first authenticated page load, with no separate signup.

### Queries

GraphQL documents and their TypeScript types live together in `src/graphql/`. `GET_USER` is
typed on both ends, so `useQuery<UserData, UserVars>` gives the component a checked result:

```ts
const { loading, data, error } = useQuery<UserData, UserVars>(GET_USER, {
  variables: { discordId: user?.sub?.split('|')[2] ?? '' },
  skip: !user,
})
```

The Discord ID comes out of the Auth0 subject (`oauth2|discord|<id>`), and `skip` keeps the
query from firing before the user resolves.

### Layout

```
src/
  Auth/            Apollo + Auth0 wiring, login/logout buttons
  ProfileInfo/     Profile, ProfileCard, LinkNation
  Template/        Header, NavMenu, LoadingScreen, routes
  graphql/         queries and their types
  Utilities/       theme constants
```

---

## Running it

```bash
npm install
npm start        # http://localhost:3000
```

Expects [farkapi](https://github.com/martip23/farkapi) running on `localhost:5050`.

Or with Docker:

```bash
docker compose up --build   # http://localhost:8080
```

---

## Known limitations

A 2022 side project for roughly ten users:

- **The API URL is hardcoded** to `http://localhost:5050` in `ApolloProviderWrapper.tsx`.
  It belongs in an environment variable — as written, this only runs against a local API.
- **`LinkNation` is unfinished.** The "already linked" branch renders, but the form itself is
  a placeholder `<div>` and `CardContent` is empty.
- **Nav menu items are inert** — `MenuConfigs.ts` wires every item to an empty `onClick`.
- **No tests**, despite the testing libraries being installed.
- A new `ApolloClient` is constructed on every render of the wrapper rather than memoised.
- Auth0 domain, client ID, audience and scope are inline in `src/index.tsx`. These are public
  values for a SPA by design, but they still belong in config.
