const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Création de l'application Express
const app = express();
const port = 3001;

// Connexion à la base de données SQLite avec Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' // Nom du fichier de la base de données
});

// Définition du modèle de données
const Data = sequelize.define('Data', {
    temperature: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pression: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vitesse: {
        type: DataTypes.STRING,
        allowNull: false,
   
    },
    led1: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    led2: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    led3: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    led4: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    led5: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    led6: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

});

// Synchronisation du modèle avec la base de données
sequelize.sync()
    .then(() => {
        console.log('La base de données a été synchronisée avec succès.');
    })
    .catch(err => {
        console.error('Erreur lors de la synchronisation de la base de données :', err);
    });

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Route GET pour récupérer tous les utilisateurs
app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.findAll();
        res.json(data);
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route POST pour ajouter un nouvel utilisateur
app.put('/api/data/', async (req, res) => {
    const id = 1;
    try {
        const dataToUpdate = await Data.findByPk(id);
        if (!dataToUpdate) {
            return res.status(404).json({ error: 'Données non trouvées' });
        }
        const { temperature, pression, vitesse, led1, led2, led3, led4, led5, led6 } = req.body;
        await dataToUpdate.update({ temperature, pression, vitesse, led1, led2, led3, led4, led5, led6 });
        res.json(dataToUpdate);
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
