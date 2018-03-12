1. Get a mongo atlas account - https://www.mongodb.com/cloud/atlas
2. Create a free cluster (and let it get deployed, takes 5 mins)
  2.A - Add security > IP Whitelist > New rule > Allow
  from anywhere
3. Verify connection string using local Mongo Compass
4. Install a new package mongoose, link in email -  http://mongoosejs.com/docs/index.html
5. Follow the guide to create collection, find and update kittens/puppies
6. Create GET APIs on top of the mongoose apis
7. Verify on POSTMAN
----
8. Move all new code to kittens.js  and refer that code as a module in index.js
