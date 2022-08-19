import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import translatte from 'translatte';

const app = express()

app.listen(8080, () => console.log(`Application is running on 127.0.0.1:8080`));

app.post('/', bodyParser.json(), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { strings, targetLangCode } = request.body;

        const translations = strings.map(string => translatte(string, { to: targetLangCode }));

        const translated = await Promise.all(translations);

        const results = translated.map(translate => translate.text);

        console.log('Translated !');
        
        response.status(200).json(results);
    } catch (e) {
        console.log('Translate Failed !');
        
        response.status(500).json(e);
    }
});