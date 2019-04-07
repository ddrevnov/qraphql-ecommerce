import gql from 'graphql-tag';

/**
|--------------------------------------------------
| Queries
|--------------------------------------------------
*/

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
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
