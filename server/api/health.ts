import * as express from 'express';

const router = express.Router();

// tslint:disable-next-line:no-shadowed-variable
router.get('/', (req: any, res: any, next: any) => {
    res.status(200).send('ok');
});

export default router;
