import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

let fileName = null;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './static/');
    },
    filename: (req, file, cb) => {
        fileName = uuidv4() + '.' + file.mimetype.split('/')[1];
        cb(null, fileName);
        req.body.avatar = fileName;
    },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export default multer({ storage, fileFilter });
