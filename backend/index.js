const express = require('express')
const cors = require('cors')
const database = require('./data.json')

const api = '/api'
const version = 'v1'

const app = express()

app.use(cors())

function pickRandom (array) {
	return array[Math.random() * array.length]
}

app.listen(8000, () => console.log('listening on 8000'))

app.post(`/api/${version}/register`, express.json(), (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.status(200).json({ status: 'successful' })
})

app.post(`/api/${version}/login`, express.json(), (req, res) => {
	const token = pickRandom(database.sessions)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Set-Cookie', `auth-token=${token}`)
	res.json({
		token: token
	})
})

app.post('/api/logout', express.json(), (req,res) => {
	res.status(200).send()
})

app.get('/api/profile', (req, res) => {
	const { page, limit, type, status } = req.query

	let response = mockTransactions.slice(parseInt(page) * parseInt(limit), (parseInt(limit)+1) * (parseInt(page)+1))

	if(status) response = response.filter(trans => trans.status === status)
	if(type) response = response.filter(trans => trans.type === type)

	res.status(200).json(response)
})

app.get('/api/transactions/:anything', (req, res) => {
	const [ response ] = mockTransactions

	res.status(200).json(response)
})

app.get('/api/profile', (req, res) => {
	res.status(200).json({
		id: 'Nabil_Tharwat21',
		username: 'Nabil_Tharwat',
		email: 'example@example.com',
		email_verified_at: '12-07-2019',
		type: 'customer',
		wallet: 5000,
		total_income: 6000,
		image: '/profilePicture.svg',
		created_at: 'string',
		updated_at: 'string',
		name: 'Nabil Tharwat',
		address: '13, address, apt. 5, some city, wonderland',
		first_name: 'Nabil',
		last_name: 'Tharwat',
		total_spending: 1000
	})
})

app.post('/api/recharge', (req, res) => {
	res.status(200).send()
})


app.post('/api/transfer', (req, res) => {
	res.status(200).send()
})

app.get('/api/merchants', (req,res) => {
	const { page, limit } = req.query
	let response = []

	response = merchants.slice(parseInt(page) * parseInt(limit), (parseInt(limit)+1) * (parseInt(page)+1))

	res.status(200).json(response)
})

app.get('/api/merchants/:merchantId/services', (req, res) => {
	const { page, limit } = req.query
	let response = []

	response = mockServices.slice(parseInt(page) * parseInt(limit), (parseInt(limit)+1) * (parseInt(page)+1))

	res.status(200).json(response)
})

app.get('/api/merchants/:merchantId/products', (req, res) => {
	const { page, limit } = req.query
	let response = []

	response = mockProducts.slice(parseInt(page) * parseInt(limit), (parseInt(limit)+1) * (parseInt(page)+1))

	res.status(200).json(response)
})

app.get('/api/merchants/:merchantId', (req, res) => {
	res.status(200).json({
		id: 'FKASDPLWE01083471',
		username: 'Spotify',
		email: 'spotify@example.com',
		type: 'merchant',
		name: 'Spotify Technology',
		address: '13, address, apt. 5, some city, wonderland',
		total_spending: 1000
	})
})

app.get('/api/services/:serviceId', (req,res) => {
	res.json({
		id: 'string',
		merchant_id: 'string',
		name: 'Spotify Response Object',
		description: 'Spotify Response Object Description',
		price: 500,
		period: 30,
		image: 'string',
		created_at: 'string',
		updated_at: 'string'
	})
})

app.get('/api/products/:productId', (req,res) => {
	res.json({
		id: 'string',
		merchant_id: 'string',
		name: 'Spotify Response Object',
		description: 'Spotify Response Object Description',
		price: 500,
		period: 30,
		image: 'string',
		created_at: 'string',
		updated_at: 'string'
	})
})

function allRoutesHandler (req, res){
	res.status(404).json({
		errors: {
			notification: [ 'Something went wrong' ]
		}
	})
}

app.all('/api/*', allRoutesHandler)