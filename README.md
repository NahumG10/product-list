This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

Database Connection
MongoDB Connection Setup
The application connects to MongoDB using a connection string specified in the .env.local file:

MONGODB_URI=mongodb://localhost:27017/Innovate

You can modify this connection string to point to your MongoDB instance:
For local development: mongodb://localhost:27017/your-database-name
For MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority


Afterwards, insert a fisrt product to products collection as follows:

{
  "name": "Test Product",
  "description": "This is a test product description",
  "price": 19.99,
  "category": "Electronics",
  "imageUrl": "https://picsum.photos/seed/picsum/200/300"
}
