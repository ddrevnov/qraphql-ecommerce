import React from 'react';
import { Icon, message } from 'antd';
import { Mutation } from 'react-apollo';
import { IItem } from '../../interfaces';
import { DELETE_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../../shared/queries';

interface DeleteItemMutation {
  deleteItem: IItem;
}

interface Props {
  id?: string;
}

const DeleteIcon: React.FC<Props> = ({ id }) => {
  if (!id) return null;

  const update = (cache: any, payload: any) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });

    data.items = data.items.filter(
      (item: IItem) => item.id !== payload.data.deleteItem.id
    );

    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  return (
    <Mutation<DeleteItemMutation, { id: string }>
      mutation={DELETE_ITEM_MUTATION}
      update={update}
    >
      {(deleteItem, { error }) => {
        if (error) {
          message.error(error);
        }

        if (!id) return null;

        return (
          <Icon
            onClick={() => deleteItem({ variables: { id } })}
            type="delete"
          />
        );
      }}
    </Mutation>
  );
};

export default DeleteIcon;
