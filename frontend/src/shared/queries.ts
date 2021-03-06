import gql from "graphql-tag";
import { perPage } from "../config";

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

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      id
      email
      name
      permissions
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
    signUp(email: $email, name: $name, password: $password) {
      user {
        id
        email
        name
      }
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SIGNIN_USER($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        email
        name
      }
      token
    }
  }
`;

export const REQUEST_RESET = gql`
  mutation REQUEST_RESET($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]!
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;
