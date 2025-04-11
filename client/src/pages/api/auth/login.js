import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import jwt from 'jsonwebtoken';

const client = new ApolloClient({
  uri: process.env.HASURA_ENDPOINT_URL,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user, password: pass } = req.body;

    try {
      const query = gql`
        query GetUserByUser($user: String!) {
          usuarios(where: { user: { _eq: $user } }) {
            id
            user
            pass
          }
        }
      `;

      const { data } = await client.query({
        query,
        variables: { user },
      });

      const loggedInUser = data?.usuarios?.[0];

      if (loggedInUser && loggedInUser.pass) {
        const passwordMatch = (pass === loggedInUser.pass);

        if (passwordMatch) {
          const token = jwt.sign(
            { userId: loggedInUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Credenciales inválidas' });
        }
      } else {
        res.status(404).json({ message: 'Usuario no existe' });
      }
    } catch (error) {
      console.error('Error durante el login:', error.message); 
      res.status(500).json({ message: 'Error en la consulta GraphQL' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}