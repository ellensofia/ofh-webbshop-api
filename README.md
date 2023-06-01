# Our Furnished Home, Ecommerce API

This project was built as part of the Front End Developer course at Medieinstitutet, Gothenburg.

Our Furnished Home is a mock ecommerce site for furniture and interior decoration. The frontend was build in a previous task, the focus of this project was to build the API and connect with the frontend application, making sure all data is recorded and rendered correctly.

The front end is built in React with Vite and the backend implements Express, Mongoose and Connect Busboy. All data is stored in a MongoDB database.

## Installation

Clone the repository to your local machine.

The project consists of two parts, the frontend and the backend. To run the project locally, you need to install the dependencies for both parts:

- `cd client` and run `npm install`
- `cd server` and run `npm install`

Similarly, to run the project in development mode, you need to run both parts:

- `cd client` and run `npm run dev`
- `cd server` and run `npm run dev`

The application will then be visible at http://localhost:5173/

## Usage

Users of Our Furnished Home can brose the products in the database, add them to a shopping cart and place an order. The user can also create an account and log in to see their order history. Some users are designated as admins and therefore have admin access. Admins can add, edit and delete products, as well as view all orders and mark them as shipped.

To log in as a user create an account by clicking the user icon in the top right corner. In the dropdown menu click 'Login' then follow the link to create an account. To log in as an admin, use the following credentials:

email: admin@email.com
password: admin

## Contributors

Ellen Dahlgren, [github](https://github.com/ellensofia)
Nathalie Gustafsson, [github](https://github.com/nathaliegustafsson)
Nathanael Blackbourn, [github](https://github.com/NathanaelBlackbourn)
Parham Berenjian, [github](https://github.com/ParhamInBinary)

[Github repository](https://github.com/ellensofia/ofh-webbshop-api)

## Företagsidé pitch

Stig in i framtidens sätt att shoppa möbler – välkommen till Our furnished home! Utforska vårt handplockade inredningssortiment online och skapa ditt drömhem med några enkla klick. Slipp trängsel och få allt levererat direkt till din dörr. Our furnished home - där stil och bekvämlighet möter framtidens shopping. Besök oss idag och låt din inredningsfantasi flöda fritt!

# Kravlistan

### G

- [x] Alla sidor skall vara responsiva. (G)

  > Frontenden byggdes i en tidigare uppgift, och är responsiv.

- [x] Arbetet ska implementeras med en React frontend och en Express backend. (G)

  > Frontenden byggdes i en tidigare uppgift, och är byggd med React och Vite. Backendapplikationen är byggd med Express.

- [x] Express backenden ska ha validering på samtliga endpoints. (G)

  > Backendapplikationen använder Yup för validering på samtliga endpoints.

- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)

  > Diagrammen finns [här](https://drive.google.com/file/d/1YvyGwDXw9pSFX4pKZ9lUu4rCFx7lhcnL/view?usp=sharing)

- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)

  > Företagsidén finns ovan.

- [x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm)

  > Databas uppkoppling finns i filen server/src/server.ts

- [x] Man ska kunna logga in som administratör i systemet (G)

  > Administratörer kan logga in med email 'admin@email.com' och 'lösenord admin'.

- [x] Inga Lösenord får sparas i klartext i databasen (G)

  > Lösenord krypteras med argon2 innan de sparas i databasen.

- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)

  > Funktionen registerOrder i filen server/src/controllers/orderController.ts anropar funktionen updateStockOnOrder i filen server/src/resources/products/product-controller.ts för att uppdatera lagersaldot i databasen.

- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)

  > Funktionen editProduct i filen server/src/resources/products/product-controller.ts hanterar all användare-ändring av produktdata.

- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)

  > Listan syns på sidan /admin/orders om man är inloggad som admin.

- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)

  > Admin kan lägga till nya kategorier från produkt överblick sidan. Kategorierna kan läggas till på prdukter i både ny produkt panelen produktredgiering panelen.

- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)

  > Det finns en dropdown på hemsidan där man kan toggla produktkategorierna som visas. Om inga kategorier är valda så visas alla.

- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)

  > Kundkorgen i localStorages implementerades i den tigigare uppgiften.

- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)

  > Om en nya användare lägger till produkter i korgen och navigera till checkout så se de en länk där de kan klicka för att logga in eller registrera sig.

- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)

  > Yup används för validering på samtiliga checkoutfält.

### VG

- [x] Ett CI flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)

  > CI flödet finns i filen .github/workflows/check-pr.yml.

- [x] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)

  > Om en användare är inloggad som kund så kan de se sina beställningar på sidan /myOrders.

- [x] Administratörer ska kunna redigera produkt inklusive vilka kategorier den tillhör (VG)

  > Admin kan redigera produkter från produktöverblick sidan genom att klicka på redgiera-ikonen bredvid varje produkt.

- [x] Administratörer ska kunna lägga till och ta bort produkter (VG)

> Det går att lägga till produkter som admin genom att klicka på 'Add product' på produktöverblick sidan. Det går att ta bort produkter genom att klicka på ikonen bredvid varje produkt i listan.

- [x] Backendapplikationen ska ha en fungerande global felhantering (VG)

> Global felhantering finns i filen server/src/app.ts.

- [x] En administratör ska kunna uppgradera en användare till administratör (VG)

> Admin kan ändra roll på användare från sidan /users genom att klicka på ikonen bredvid varje användare i listan.

- [x] Administratörer ska kunna markera beställningar som skickade (VG)

> Admin kan ändra egenskapet 'isShipped' på order dokument genom att klicka på ikonen bredvid varje order i listan på sidan /admin/orders.
