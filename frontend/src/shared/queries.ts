import gql from 'graphql-tag';
import { perPage } from '../config';

/**
|--------------------------------------------------
| Queries
|--------------------------------------------------
*/

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
    }
  }
`;

export const ITEM_QUERY = gql`
  query ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      image
    }
  }
`;

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

/**
|--------------------------------------------------
| Mutations
|--------------------------------------------------
*/

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(where: { id: $id }) {
      id
      title
      description
      price
      image
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: Upload
  ) {
    updateItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
      }
      where: { id: $id }
    ) {
      id
      title
      description
      price
      image
    }
  }
`;

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
      }
    ) {
      id
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SIGNUP_USER($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
    }
  }
`;
