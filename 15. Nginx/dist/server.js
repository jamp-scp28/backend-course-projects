"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const faker_1 = require("@faker-js/faker");
const normalizr_1 = require("normalizr");
const dbConfig_1 = require("./containers/dbConfig");
const bodyParser = __importStar(require("body-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const productDaoMongo_1 = require("./daos/products/productDaoMongo");
const messageDaoMongo_1 = require("./daos/messages/messageDaoMongo");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const os_1 = __importDefault(require("os"));
const userDaoMongo_1 = require("./daos/users/userDaoMongo");
const validatePass_1 = __importDefault(require("./utils/validatePass"));
const encryptPass_1 = __importDefault(require("./utils/encryptPass"));
require("dotenv/config");
const child_process_1 = require("child_process");
const cluster_1 = __importDefault(require("cluster"));
const config = require('./utils/config');
const cpus = os_1.default.cpus().length;
const ENV = config.ENV;
const MODE = config.MODE;
const PORT = config.PORT;
const LocalStrategy = passport_local_1.default.Strategy;
//Interface definition
const jsonParser = (0, body_parser_1.default)();
const create_products = (qnt) => {
    let products = [];
    for (let i = 0; i < qnt; i++) {
        let obj = {
            name: faker_1.faker.commerce.product(),
            price: parseInt(faker_1.faker.commerce.price()),
            photo: faker_1.faker.image.business()
        };
        products.push(obj);
    }
    return products;
};
const normalize_data = (data) => {
    const author_schema = new normalizr_1.schema.Entity('authors', {}, { idAttribute: 'email' });
    const messages_schema = new normalizr_1.schema.Entity('messages', {
        author: author_schema
    });
    const normalize_messages = (0, normalizr_1.normalize)(data, [messages_schema]);
    return normalize_messages;
};
//Server Endpoints
async function main() {
    if (cluster_1.default.isPrimary) {
        console.log(`Number of CPUs is ${cpus}`);
        console.log(`Primary ${process.pid} is running`);
        // Fork workers.
        for (let i = 0; i < (cpus - 6); i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on("exit", (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            console.log("Start another express server!");
            cluster_1.default.fork();
        });
    }
    else {
        const app = (0, express_1.default)();
        const router = (0, express_2.Router)();
        const random_nmb = (0, express_2.Router)();
        const models = await (0, dbConfig_1.mongoConn)();
        const productDB = new productDaoMongo_1.productDaoMongo(await (0, dbConfig_1.mongoConn)());
        const messageDB = new messageDaoMongo_1.messageDaoMongo(await (0, dbConfig_1.mongoConn)());
        const usersDB = new userDaoMongo_1.usersDaoMongo(await (0, dbConfig_1.mongoConn)());
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
        app.use(express_1.default.static("public"));
        app.use("/api", router);
        app.use("/rnd_api", random_nmb);
        router.use(bodyParser.json());
        router.use(express_1.default.urlencoded({ extended: true }));
        router.use((0, express_session_1.default)({
            store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URL_SESSION }),
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                path: '/',
                httpOnly: false,
                maxAge: 60000 * 10
            }
        }));
        // Set up login and register for passport
        passport_1.default.use('login', new LocalStrategy((username, password, callback) => {
            models.models.users.findOne({ username: username }, (err, user) => {
                if (err) {
                    return callback(err);
                }
                if (!user) {
                    console.log('User not found...');
                    return callback(null, false);
                }
                if (!(0, validatePass_1.default)(user, password)) {
                    console.log('Wrong password...');
                    return callback(null, false);
                }
                return callback(null, user);
            });
        }));
        passport_1.default.use('signup', new LocalStrategy({ passReqToCallback: true }, (req, username, password, callback) => {
            models.models.users.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log('There was an error.');
                    return callback(err);
                }
                if (user) {
                    console.log('The user is already created.');
                    return callback(null, false);
                }
                console.log(req.body);
                const newUser = {
                    email: req.body.email,
                    username: req.body.username,
                    password: (0, encryptPass_1.default)(req.body.password)
                };
                console.log(newUser);
                models.models.users.create(newUser, (err, userWithId) => {
                    if (err) {
                        console.log('There is a problem creating the new user...');
                        return callback(err);
                    }
                    console.log(userWithId);
                    console.log('User created sucessfully...');
                    return callback(null, userWithId);
                });
            });
        }));
        passport_1.default.serializeUser((user, callback) => {
            callback(null, user._id);
        });
        passport_1.default.deserializeUser((_id, callback) => {
            models.models.users.findById(_id, callback);
        });
        //
        router.use(passport_1.default.session());
        router.get('/', (req, res) => {
            res.send(req.session);
        });
        router.get('/info', (req, res) => {
            let obj_info = {
                'Args': process.argv,
                'OS': process.platform,
                'Node Version': process.version,
                'Reserved Memory': process.memoryUsage().rss,
                'Exec Path': process.execPath,
                'Process ID': process.pid,
                'Project Folder': process.cwd(),
                '#Processors': cpus
            };
            res.send(obj_info);
        });
        random_nmb.get('/randoms', (req, res) => {
            const qnt = req.query.qnt ? req.query.qnt : 100000000;
            const forked = (0, child_process_1.fork)('./src/compute.ts');
            forked.send(qnt);
            forked.on("message", (obj) => {
                res.json(obj);
            });
        });
        router.post('/login', passport_1.default.authenticate('login', { failureRedirect: '/login' }), jsonParser, (req, res) => {
            if (req.isAuthenticated()) {
                res.redirect('/profile');
            }
            else {
                res.send('there was an error...');
            }
        });
        router.post('/signup', passport_1.default.authenticate('signup', { failureRedirect: '/login' }), jsonParser, (req, res) => {
            if (req.isAuthenticated()) {
                res.redirect("/profile");
            }
            else {
                res.res("there was an error...");
            }
        });
        function checkLogged(req, res, next) {
            if (req.session.logged === true) {
                next();
            }
            else {
                return res.redirect('/api/login');
            }
        }
        router.get('/welcome', checkLogged, (req, res) => {
            if (req.session) {
                req.session.expires += 5 * 60000;
            }
            res.send('Welcome: ' + req.session.user);
        });
        router.get('/logout', (req, res) => {
            req.session.destroy(error => {
                if (error) {
                    res.send({ status: 'Logout Error', body: error });
                }
            });
            res.send('User logged out');
        });
        //Messages
        router.get("/products-test", (req, res) => {
            let products = create_products(5);
            res.send(JSON.stringify(products));
        });
        router.get("/messages", (req, res) => {
            messageDB.getData(function (result) {
                let data = normalize_data(result);
                res.json(data);
            });
        });
        router.post("/messages", jsonParser, async function (req, res) {
            let data = req.body;
            console.log(req.body);
            data.timestamp = new Date();
            await messageDB.insertRecord(data);
            res.send("Ok...");
        });
        app.listen(PORT, () => {
            console.log("App up and running.");
        });
    }
}
main();
