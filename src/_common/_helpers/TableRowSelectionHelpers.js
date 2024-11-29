import React from "react";

function SelectionCheckbox({ isSelected, onChange }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} />
      <label className="checkbox checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        <span />
      </label>
    </>
  );
}

function groupingItemOnSelect(props) {
  const { ids, setIds, customerId } = props;
  if (ids.some((id) => id === customerId)) {
    setIds(ids.filter((id) => id !== customerId));
  } else {
    const newIds = [...ids];
    newIds.push(customerId);
    setIds(newIds);
  }
}

function groupingAllOnSelect(props) {
  const { isSelected, setIds, entities } = props;
  if (!isSelected) {
    const allIds = [];
    entities.forEach((el) => allIds.push(el.id));
    setIds(allIds);
  } else {
    setIds([]);
  }

  return isSelected;
}

export function getSelectRow(props) {
  const { entities, ids, setIds } = props;
  return {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected =
        entities && entities.length > 0 && entities.length === ids.length;
      const props = { isSelected, entities, setIds };
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingAllOnSelect(props)}
        />
      );
    },
    selectionRenderer: ({ rowIndex }) => {
      const isSelected = ids.some((el) => el === entities[rowIndex].id);
      const props = { ids, setIds, customerId: entities[rowIndex].id };
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingItemOnSelect(props)}
        />
      );
    },
  };
}
