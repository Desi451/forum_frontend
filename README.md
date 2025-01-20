# Forum Frontend

To repozytorium zawiera frontend aplikacji forum. Projekt został zbudowany w oparciu o **Angular**, oferując responsywny i przyjazny interfejs użytkownika do interakcji z forum.

## Spis Treści

1. [Funkcje](#funkcje)  
2. [Wykorzystane Technologie](#wykorzystane-technologie)  
3. [Rozpoczęcie Pracy](#rozpoczęcie-pracy)  
   - [Wymagania wstępne](#wymagania-wstępne)  
   - [Instalacja](#instalacja)  
   - [Uruchamianie aplikacji](#uruchamianie-aplikacji)  
4. [Struktura Katalogów](#struktura-katalogów)  

## Funkcje

- Autoryzacja i uwierzytelnianie użytkowników  
- Lista tematów forum z możliwością filtrowania  
- Tworzenie, edytowanie i usuwanie postów  
- Odpowiadanie na posty i obsługa zagnieżdżonych komentarzy  
- Responsywny design dla urządzeń mobilnych i komputerów  
- Integracja z API backendowym  

## Wykorzystane Technologie

- **Framework**: Angular  
- **Zarządzanie stanem**: RxJS  
- **Stylowanie**: SCSS  
- **Biblioteka komponentów**: Angular Material  
- **Obsługa Drag & Drop**: Angular CDK  

## Rozpoczęcie Pracy

### Wymagania wstępne

Przed rozpoczęciem pracy upewnij się, że masz zainstalowane następujące narzędzia:

- **Node.js** (zalecana wersja v16+)  
- **Angular CLI** (zalecana wersja v14+)  
- **npm** (w zestawie z Node.js)  

### Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/Desi451/forum_frontend.git
   cd forum_frontend
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

### Uruchamianie aplikacji

3. Uruchom aplikację:
   ```bash
   ng serve
   ```

4. Otwórz przeglądarkę i przejdź do:
   ```
   http://localhost:4200
   ```

## Struktura Katalogów

```
forum_frontend/
├── src/
│   ├── app/                   # Główny moduł aplikacji
│   │   ├── admin/             # Komponenty związane z panelem administratora
│   │   ├── core/              # Autoryzacja, serwisy i konfiguracje środowisk
│   │   │   ├── auth/          # Serwis autoryzacji, interceptor
│   │   │   └── services/      # Serwisy do komunikacji z API dla komponentów
│   │   ├── models/            # Modele danych/interfejsy
│   │   ├── threads/           # Komponenty związane z wątkami
│   │   ├── user/              # Komponenty związane z użytkownikiem
│   │   ├── shared/            # Komponenty ogólnodostępne
│   │   └── app.module.ts      # Główny moduł Angulara
│   ├── assets/                # Zasoby statyczne (np. obrazy, czcionki)
│   └── styles.scss            # Globalne style SCSS
├── angular.json               # Konfiguracja Angulara
├── package.json               # Zależności i skrypty
└── README.md                  # Dokumentacja
```
