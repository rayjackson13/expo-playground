import { View, Text, FlatList, ListRenderItem } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import Checkbox from '../../components/Checkbox';

type Item = {
  title: string;
  isSelected: boolean;
}

const defaultArray: Item[] = Array.apply(null, Array(1000)).map(
  (_, idx) => ({ title: `Checkbox #${idx}`, isSelected: false }) as Item
);

export default function ListPerformance() {
  const [checkboxList, setCheckboxList] = useState(defaultArray);

  const toggleCheckbox = useCallback(
    (index: number) => {
      // Simulates heavy workload.
      for (let i = 0; i < 20000000; i++) {}
      setCheckboxList(
        list => list.map((item, idx) => {
          if (idx !== index) {
            return item;
          }

          return {
            ...item,
            isSelected: !item.isSelected,
          };
        })
      );
    },
    []
  );

  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return <Checkbox {...item} index={index} onPress={toggleCheckbox} />
  };

  return (
    <FlatList
      data={checkboxList}
      renderItem={renderItem}
    />
  )
}