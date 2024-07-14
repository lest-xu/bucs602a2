# Assignment 1 - CS602

This README.md file provides an overview of the assignments functionality implemented for Assignment 2 Li Xu- CS602 O2 2024.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)


## Technologies Used

- JavasScript
- Express.js
- Handlebars.js 
- Node.js

## Getting Started

### Prerequisites

- Node.js installed on your machine. You can download and install Node.js from [here](https://nodejs.org/en/download).

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/lest-xu/bucs602a2.git

2. Navigate to the project directory:

   ```sh
   cd yourrepo/bucs601a2

3. Install the libraries:

   ```sh
   npm install

### Running the Application

1. Run the JavasSript code:

   ```sh
   node part1/server/server.js
   ```

   ```sh
   node part1/client/client.js
   ```

   ```sh
   node part2/server.js
   ```

Then open the link http://localhost:3000 in your browser for each part of the assignment.

## File Structure

The project directory contains the following files:

```
    bucs602a1/
        part1/
         client/
            node_modules/
            ── client.js
            ── package.json
         server/
            node_modules/
            ── package.json
            ── server.js
            ── zipCodeModule_v2.js
            ── zips.json
      part2/
         node_modules/
         public/
            ── bu-logo.gif
         views/
            ── 404.handlebars
            ── homeView.handlebars
            ── lookupByCityStateForm.handlebars
            ── lookupByCityStateView.handlebars
            ── lookupByZipForm.handlebars
            ── lookupByZipView.handlebars
            ── populationForm.handlebars
            ── populationView.handlebars
         ── package-lock.json
         ── package.json
         ── server.js
         ── zipCodeModule_v2.js
         ── zips.json

      ── README.md
