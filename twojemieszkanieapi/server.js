const jsonServer = require("json-server")
const multer  = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        let date = new Date()
        let imageFileName = date.getTime() + "_" + file.originalname
        req.body.imageFileName = imageFileName
        cb(null, imageFileName)
    }
})

let nextId = 1;

const bodyParser = multer({ storage: storage }).any()

server.use(bodyParser)
server.post("/flats", (req, res, next) => {
    let date = new Date()
        req.body.createdAt = date.toISOString()

    if (req.body.price) {
        req.body.price = Number(req.body.price)
    }
	if (req.body.standard) {
        req.body.standard = Number(req.body.standard)
    }
	if (req.body.year) {
        req.body.year = Number(req.body.year)
    }

    let hasErrors = false
    let errors = {}

    if (req.body.location.length < 2) {
        hasErrors = true
        errors.location = "nazwa miasta/miejscowości powinna być dłużasza niż 2 znaki"
    }
    if (req.body.price <= 0) {
        hasErrors = true
        errors.price = "Cena nie może być ujemna lub zerowa"
    }
    if (req.body.standard <= 0) {
        hasErrors = true
        errors.standard = "Standard nie może być ujemny lub zerowy"
    }
    if (req.body.year <= 1900) {
        hasErrors = true
        errors.year = "Rok nie może być mniejszy niż 1900"
    }

    if (hasErrors) {
		//return bad request (400) with validation errors
        res.status(400).jsonp(errors)
        return
    }
	// continue to JSON Server router
    next()
})

server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})