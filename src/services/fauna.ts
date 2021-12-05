import { Client } from 'faunadb'

//isso ja me da acesso ao banco de dado, porem nao posso fazer operaçãoes do lado do browser. somenta nas apis routes ou
//getStaticProps ou getStaticProps
export const fauna = new Client({
    secret: process.env.FAUNADB_KEY
})