# FortisPlay Admin — Mermaid Architecture Diagrams

> All diagrams are based on actual codebase analysis — no assumptions or inventions.

---

## 1. High-Level Architecture

```mermaid
graph TB
    subgraph Browser["Browser / PWA Shell"]
        SW["Service Worker<br/>public/sw.js"]
    end

    subgraph NextJS["Next.js 15 App Router"]
        subgraph Pages["Pages (Server Components)"]
            Login["/ — LoginPage"]
            Dashboard["/dashboard — DashboardPage"]
            EventDay["/event-day — EventDayPage"]
            Masters["/masters — MastersPage"]
            NotFound["not-found.tsx"]
        end

        subgraph Layouts["Layouts"]
            RootLayout["RootLayout<br/>Font, Metadata, ToastProvider"]
            AppLayout["AppLayout (app)<br/>Navbar + Footer"]
        end

        subgraph Components["Components"]
            UI["UI Library (13 primitives)"]
            LayoutComp["Layout Components"]
            FeatureComp["Feature Components"]
        end

        subgraph DataLayer["Data Layer"]
            Services["services/<br/>events.ts, venues.ts"]
            Types["types/index.ts"]
            Lib["lib/utils.ts"]
        end
    end

    subgraph MockData["Mock Data (Current)"]
        StaticEvents["Hardcoded EventGroup[]"]
        StaticVenues["Hardcoded Venue[]"]
    end

    Browser --> NextJS
    RootLayout --> AppLayout
    AppLayout --> Pages
    Pages --> Components
    Components --> UI
    Pages --> Services
    Services --> MockData
    Services --> Types
    Components --> Lib
```

---

## 2. Component Hierarchy

```mermaid
graph TD
    RootLayout["RootLayout<br/>src/app/layout.tsx"]
    ToastProvider["ToastProvider<br/>Context"]
    PwaRegister["PwaRegister"]

    RootLayout --> ToastProvider
    RootLayout --> PwaRegister

    subgraph Public["Public Routes"]
        LoginPage["LoginPage /"]
        LoginPage --> Logo1["Logo"]
        LoginPage --> LoginForm["LoginForm 🔶"]
        LoginPage --> Footer1["Footer"]
    end

    subgraph Authenticated["(app) Route Group"]
        AppLayout["AppLayout"]
        AppLayout --> Navbar["Navbar 🔶"]
        AppLayout --> FooterA["Footer"]
        Navbar --> Sidebar["Sidebar 🔶"]
        Navbar --> SearchBar1["SearchBar 🔶"]
        Navbar --> Logo2["Logo"]

        subgraph DashPage["Dashboard Page"]
            DashboardPage["DashboardPage"]
            DashboardPage --> Breadcrumb1["Breadcrumb"]
            DashboardPage --> LiveEventsView["LiveEventsView 🔶"]
            LiveEventsView --> EventGroupCard["EventGroupCard"]
            EventGroupCard --> EventScheduleTable["EventScheduleTable"]
            EventScheduleTable --> Badge["Badge"]
            LiveEventsView --> MasterDataModal["MasterDataModal 🔶"]
        end

        subgraph MastersPage["Masters Page"]
            MPage["MastersPage"]
            MPage --> Breadcrumb2["Breadcrumb"]
            MPage --> MastersTabs["MastersTabs 🔶"]
            MPage --> VenuesTable["VenuesTable 🔶"]
            VenuesTable --> Pagination["Pagination 🔶"]
            VenuesTable --> AddVenueDrawer["AddVenueDrawer 🔶"]
        end
    end

    ToastProvider --> Public
    ToastProvider --> Authenticated

    style LoginForm fill:#FEF3C7
    style LiveEventsView fill:#FEF3C7
    style MasterDataModal fill:#FEF3C7
    style Navbar fill:#FEF3C7
    style Sidebar fill:#FEF3C7
    style SearchBar1 fill:#FEF3C7
    style MastersTabs fill:#FEF3C7
    style VenuesTable fill:#FEF3C7
    style Pagination fill:#FEF3C7
    style AddVenueDrawer fill:#FEF3C7
```

> 🔶 = Client Component (`'use client'`)

---

## 3. State Management Flow

```mermaid
graph LR
    subgraph Context["React Context (App-Wide)"]
        ToastCtx["ToastProvider<br/>toasts: ToastMessage[]<br/>show() / dismiss()"]
    end

    subgraph LocalState["Local Component State (useState)"]
        LF["LoginForm<br/>showPassword, isLoading"]
        LEV["LiveEventsView<br/>activeTab, isRefreshing, isModalOpen"]
        VT["VenuesTable<br/>query, page, selected, isDrawerOpen"]
        AVD["AddVenueDrawer<br/>status, isSubmitting"]
        NB["Navbar<br/>sidebarOpen"]
    end

    subgraph ServerProps["Server → Client Props"]
        SP1["groups: EventGroup[]"]
        SP2["venues: Venue[]"]
    end

    SP1 -->|"props"| LEV
    SP2 -->|"props"| VT
    ToastCtx -->|"useToast()"| LF
    ToastCtx -->|"useToast()"| AVD
```

---

## 4. Current Data Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant P as Page (Server)
    participant S as Service Layer
    participant M as Mock Data
    participant C as Client Component
    participant U as User

    B->>P: GET /dashboard
    P->>S: getLiveEvents()
    S->>M: Return hardcoded EventGroup[]
    M-->>S: Static data
    S-->>P: EventGroup[]
    P->>C: <LiveEventsView groups={data} />
    C->>B: Render HTML + hydrate
    B->>U: Display Live Events

    U->>C: Click tab "Horse Racing"
    C->>C: useState → filter groups
    C->>B: Re-render filtered view

    U->>C: Click "Create Race Card"
    C->>C: useState → isModalOpen = true
    C->>B: Render MasterDataModal
```

---

## 5. Future Backend Integration Flow (Recommended)

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant R as Redux Store
    participant RTK as RTK Query / API Slice
    participant API as API Layer (services/)
    participant BE as Backend API

    U->>C: User Action
    C->>R: dispatch(action)
    R->>RTK: API mutation/query
    RTK->>API: apiClient.get/post()
    API->>BE: HTTP Request + Auth Token
    BE-->>API: JSON Response
    API-->>RTK: Normalized Data
    RTK-->>R: Cache + State Update
    R-->>C: useSelector() / RTK hook
    C->>U: Re-render UI

    Note over RTK,R: Automatic caching,<br/>invalidation, retry &<br/>optimistic updates
```

---

## 6. Routing Diagram

```mermaid
graph TD
    Root["/ (Root)"]

    Root --> LoginPage["page.tsx<br/>LoginPage (Public)"]
    Root --> NotFound["not-found.tsx<br/>404 Page"]

    Root --> AppGroup["(app)/ Route Group<br/>layout.tsx → Navbar + Footer"]

    AppGroup --> Dashboard["/dashboard<br/>DashboardPage"]
    AppGroup --> EventDay["/event-day<br/>EventDayPage"]
    AppGroup --> MastersRoute["/masters<br/>MastersPage"]

    AppGroup --> Allotments["/allotments ❌"]
    AppGroup --> Reports["/reports ❌"]
    AppGroup --> CCTV["/cctv ❌"]
    AppGroup --> CollMerger["/collection-merger ❌"]

    MastersRoute --> MastersVenues["Venues (default)"]
    MastersRoute --> Pools["/masters/pools ❌"]
    MastersRoute --> LSPrize["/masters/ls-prize ❌"]
    MastersRoute --> Distributions["/masters/distributions ❌"]
    MastersRoute --> Enclosures["/masters/enclosures ❌"]
    MastersRoute --> Terminals["/masters/terminals ❌"]
    MastersRoute --> Users["/masters/users ❌"]
    MastersRoute --> UsersKYC["/masters/users-kyc ❌"]
    MastersRoute --> Locations["/masters/locations ❌"]

    style Allotments fill:#FEE2E2,stroke:#DC2626
    style Reports fill:#FEE2E2,stroke:#DC2626
    style CCTV fill:#FEE2E2,stroke:#DC2626
    style CollMerger fill:#FEE2E2,stroke:#DC2626
    style Pools fill:#FEE2E2,stroke:#DC2626
    style LSPrize fill:#FEE2E2,stroke:#DC2626
    style Distributions fill:#FEE2E2,stroke:#DC2626
    style Enclosures fill:#FEE2E2,stroke:#DC2626
    style Terminals fill:#FEE2E2,stroke:#DC2626
    style Users fill:#FEE2E2,stroke:#DC2626
    style UsersKYC fill:#FEE2E2,stroke:#DC2626
    style Locations fill:#FEE2E2,stroke:#DC2626
```

> ❌ = Not yet implemented (nav link exists but no page)

---

## 7. Folder Structure Diagram

```mermaid
graph TD
    Root["fortisplay-admin/"]

    Root --> Public["public/"]
    Public --> Icons["icons/"]
    Public --> Manifest["manifest.json"]
    Public --> SWFile["sw.js"]
    Public --> Offline["offline.html"]

    Root --> Src["src/"]

    Src --> App["app/"]
    App --> GlobalCSS["globals.css"]
    App --> RootLayout["layout.tsx"]
    App --> RootPage["page.tsx (Login)"]
    App --> NotFoundPage["not-found.tsx"]
    App --> AppGroup["(app)/"]
    AppGroup --> AppLayoutFile["layout.tsx (Shell)"]
    AppGroup --> DashDir["dashboard/page.tsx"]
    AppGroup --> EventDayDir["event-day/page.tsx"]
    AppGroup --> MastersDir["masters/page.tsx"]

    Src --> Components["components/"]
    Components --> PWA["PwaRegister.tsx"]
    Components --> Auth["auth/"]
    Auth --> LoginFormFile["LoginForm.tsx"]
    Components --> DashComp["dashboard/"]
    DashComp --> EGC["EventGroupCard.tsx"]
    DashComp --> EST["EventScheduleTable.tsx"]
    DashComp --> LEV["LiveEventsView.tsx"]
    DashComp --> MDM["MasterDataModal.tsx"]
    Components --> LayoutComp["layout/"]
    LayoutComp --> NavbarFile["Navbar.tsx"]
    LayoutComp --> SidebarFile["Sidebar.tsx"]
    LayoutComp --> BreadcrumbFile["Breadcrumb.tsx"]
    LayoutComp --> FooterFile["Footer.tsx"]
    LayoutComp --> LogoFile["Logo.tsx"]
    LayoutComp --> NavConfig["nav-config.ts"]
    Components --> MastersComp["masters/"]
    MastersComp --> MT["MastersTabs.tsx"]
    MastersComp --> VTFile["VenuesTable.tsx"]
    MastersComp --> AVD["AddVenueDrawer.tsx"]
    Components --> UIComp["ui/ (13 components)"]

    Src --> Lib["lib/"]
    Lib --> Utils["utils.ts"]
    Src --> ServicesDir["services/"]
    ServicesDir --> EventsSvc["events.ts"]
    ServicesDir --> VenuesSvc["venues.ts"]
    Src --> TypesDir["types/"]
    TypesDir --> TypesIndex["index.ts"]

    Root --> Config["Config Files"]
    Config --> TSConfig["tsconfig.json"]
    Config --> NextConfig["next.config.js"]
    Config --> TailwindConfig["tailwind.config.ts"]
    Config --> ESLintConfig[".eslintrc.json"]
    Config --> PrettierConfig[".prettierrc"]
```
