import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

import Checkbox from 'components/Checkbox';

import type { ListRenderItem } from 'react-native';

type Item = {
  title: string;
  isSelected: boolean;
};

/* eslint-disable-next-line prefer-spread */
const defaultArray: Item[] = Array.apply(null, Array(1000)).map(
  (_, idx) => ({ title: `Checkbox #${idx}`, isSelected: false }) as Item,
);

export const ListPerformance = () => {
  const [checkboxList, setCheckboxList] = useState(defaultArray);

  const toggleCheckbox = useCallback((index: number) => {
    // Simulates heavy workload.
    for (let i = 0; i < 20000000; i++) {}
    setCheckboxList((list) =>
      list.map((item, idx) => {
        if (idx !== index) {
          return item;
        }

        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }),
    );
  }, []);

  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return <Checkbox {...item} index={index} onPress={toggleCheckbox} />;
  };

  return <FlatList data={checkboxList} renderItem={renderItem} />;
};
