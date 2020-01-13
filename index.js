const express = require('express')
const app = express()
const BodyParses = require('body-parser')//Agar API yang dibuat bisa membaca data yang dikirimkan oleh user baik melalui form ataupun yang berupa
const PORT = 2020

app.use(BodyParses.urlencoded({extended:false}))
app.use(BodyParses.json())// digunakan client kirim data ke server

const users = [
    {
        id:1,
        username:"jamal",
        email:"jamal@gmail.com",
        password:"123"
    },
    {
        id:2,
        username:"febry",
        email:"febry@gmail.com",
        password:"12"
    },
    {
        id:3,
        username:"dobleh",
        email:"dobleh@gmail.com",
        password:"12345"
    }
]

const products=[
    {
        id:1,
        nama:"Astor Coek",
        harga:5000,
        description:"Dengan dibalut cokelat yang yummy"
    },
    {
        id:2,
        nama:"Cheese Go",
        harga:7000,
        description:"Berasa kejunya guysss"
    },
    {
        id:3,
        nama:"Mie Instant Go",
        harga:3000,
        description:"Mie enaknya nyambung trossss"
    }
]


app.get('/',(req,res)=>{
    res.status(200).send(`Selamat datang di API guys`)//syarat wajib untuk cek koneksi
})

// Filter nama product
app.get('/products',(req,res)=>{
    // console.log(products)
    const {nama} = req.query, fixNama = nama.toLowerCase()

    var arrProduct = products.filter((val)=>{
    var valnama = val.nama.toLowerCase().includes(fixNama)
        return valnama
    })
    // console.log(arrProduct.length)
    if(arrProduct.length!==0){
        return res.status(200).send(arrProduct)
    }else {
        return res.status(404).send(`Product tidak ditemukan dengan nama tsb`)
    }
})

// app.get('/products',(req,res)=>{
//     const {hargamin,hargamax}=req.query
//     const hargaMin = parseInt(hargamin)
//     const hargaMax = parseInt(hargamax)
//     if(hargamin || hargamax){
//         var filterharga = products.filter((val)=>val.harga < hargaMin || val.harga > hargaMax)
//         if(filterharga.length===0){
//             return res.status(404).send(`Product tidak ada`)
//         }
//         return res.status(404).send(filterharga[0])
//     }else{
//         return res.status(200).send(products)
//     }
// })

app.get('/users',(req,res)=>{
    // console.log(req.query)
    const{username,password}=req.query
    if(username || password){
        var filterUser = users.filter((val)=>val.username===username && val.password === password)
        if(filterUser.length===0){
            return res.status(404).send(`User tidak ada`)
        }
        return res.status(200).send(filterUser[0])
    }else{
        return res.status(200).send(users)
    }
})

app.post('/users',(req,res)=>{
    console.log(req.body)
    const {username,email}=req.body
    var filterUser=users.filter((val)=>val.username===username || val.email===email)
    if(filterUser.length){
        return res.status(500).send({pesan:'username / email sudah ada'})
    }
    users.push({...req.body,id:users.length+1})
    res.status(200).send(`Berhasil`)
})

app.put('/editusers/:id',(req,res)=>{
    console.log(req.params.id)
    if(users[req.params.id-1]){
        users[req.params.id-1]={...users[req.params.id-1],password:req.body.password}
        return res.status(200).send(users[req.params.id-1])
    }else{
        return res.status(404).send({pesan:'username / password tidak ada'})
    }
})
// app.delete('/users',(req,res)=>{
//     console.log(req.body)
//     res.status(200).send('Delete Berhasil')
// })


app.listen(PORT,()=>{console.log(`API its running on PORT ${PORT}`)})