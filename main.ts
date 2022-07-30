import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import translatte from 'translatte';

const app = express()

app.listen(8080, () => console.log(`Application is running on 127.0.0.1:8080`));

app.post('/', bodyParser.json(), async (request: Request, response: Response, next: NextFunction) => {
    const strings = request.body.strings
    const targetLangCode = request.body.target

    const translated = await Promise.all(
        strings.map(async string => {
            const { text } = await translatte(string, { to: targetLangCode });
            return text;
        })
    );

    response.status(200).json(translated);
});