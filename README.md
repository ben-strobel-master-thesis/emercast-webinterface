# Emercast Frontend

This is the user interface for the backend of the Emercast system. It is the primary entry point for authorities. It provides a map overview over other autorities and active emergency broadcast and allows the authorities to manage authorities and create new emergency broadcasts.

## Requirements

- Make sure you have Node V18 or higher installed on your system
- Make sure you have Jdk8 or higher installed on your system (required for the openapi generator)
- Run ```npm install``` to install all required dependencies
- Run ```npm run generate```  to generate the openapi wrappers used by the frontend

## Build
- Run ```npm run build``` to create an optimized production build, that can be statically served.

## Run
- Run ```npm run dev``` to start the development server
