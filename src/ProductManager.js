import { promises as fs } from "fs"
export default class ProductManager {
    constructor() {
        this.path =  "./src/products/products.json"

    }

    readProducts = async () => {
        try {
            const productsJson = await fs.readFile(this.path, "utf-8")
            return await JSON.parse(productsJson)
        } catch (error) {
            return []
        }

    }

    async getProducts () {
        return await this.readProducts()
    }

    addProducts = async ({ title, description, price, thumbnail, code, stock }) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) return "Ingrese los campos solicitados"

        const product = await this.readProducts()

        const productExiste = product.findIndex(products => products.code === code)

        if (productExiste != -1) return  "El código ingresado ${code} ya existe"

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: product.length + 1
        }

        product.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(product, null, 2), "utf-8")
        return "A logrado ingresar con exitó"

    }

    getProductsById = async (id) => {
        const productId = await this.readProducts()
        //if(productId.length === 0) return `Producto no Existe`
        let product = productId.find(product => product.id === id)
        if (!product) return "El producto ingresado no se encuentra"

        return (product)


    }

    deleteProductsById = async (id) => {
        let productDelete = await this.readProducts()
        let productElim = productDelete.filter((product) => product.id != id)
        await fs.writeFile(this.path, JSON.stringify(productElim))
        console.log("El producto a sido eliminado")
    }

    updateProducts = async ({ id, ...product }) => {
        await this.deleteProductsById(id)
        let productDelete = await this.readProducts()
        let productMod = [{ ...product, id }, ...productDelete]
        await fs.writeFile(this.path, JSON.stringify(productMod))
        console.log(productMod)


    }


}

const products = new ProductManager()

//devuelve el array vacío, antes de agregar productos o los existentes
products.getProducts()
    .then(res => console.log(res))
    .catch(err => console.log(err))


 const respto = (
    //{
    //    "id": 1,"title": "Pan","description": "Nuestro pan esta fresco todos los dias",
    //    "price": 3000,"thumbnail": "https://res.cloudinary.com/dmicwl879/image/upload/v1684832066/proyecto%20js%20carrito/pan_i3yapn.jpg","code": "111","stock": 5
    //},
    //{
    //    "id": 2,"title": "Aceite","description": "Nuestro aceite de maravilla 100% natural","price": 3000,"thumbnail": "https://res.cloudinary.com/dmicwl879/image/upload/v1684832338/proyecto%20js%20carrito/aceiteolivagirasol_thnmli.webp","code": "222","stock": 5
    //},
    //{
    //   "id": 3,"title": "Arroz","description": "Nuestro arroz tiene diferentes grosores","price": 4000,"thumbnail": "https://res.cloudinary.com/dmicwl879/image/upload/v1684832369/proyecto%20js%20carrito/1634751167325_j008us.jpg",
    //    "code": "333","stock": 5
    //},
    //{
    //    "id": 4, "title": "Fideos", "description": "Tenemos fideos de todas las calidades, se tardan mas o menos tiempo en cocer", "price": 1200, "thumbnail": "https://res.cloudinary.com/dmicwl879/image/upload/v1684832385/proyecto%20js%20carrito/istockphoto-185065945-612x612_hwlcnk.jpg","code": "444","stock": 5
    //},

    {
        "id": 5,
        "title": "Salsa",
        "description": "Salsa de tomate 100% organica",
        "price": 1500,
        "thumbnail": "https://res.cloudinary.com/dmicwl879/image/upload/v1684832398/proyecto%20js%20carrito/salsa-de-tomate-casera-des_wwoleo.jpg",
        "code": "444",
        "stock": 5
    }

)


 products.addProducts(respto)
     .then(res => console.log(res))
     .catch(err => console.log(err))

products.getProductsById(5)
.then(res => console.log(res))
.catch(err => console.log(err))

 products.deleteProductsById()

products.updateProducts({
    "id": 6,
    "title": "Sal",
    "description": "Sal de mar 100% organica",
    "price": 6500,
    "thumbnail": "https://res.cloudinary.com/dmicwl879/image/upload/v1684832491/proyecto%20js%20carrito/sal_r93qd5.jpg",
    "stock": 5
})