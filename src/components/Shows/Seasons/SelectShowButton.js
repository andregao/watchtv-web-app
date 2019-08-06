import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PopoverMenu from '../../layouts/PopoverMenu';

const SelectSeasonButton = ({
  seasonNum,
  showData,
  isSelected,
  handleAddSeason,
  handleRemoveSeason
}) => {
  const [removeSeasonMenuAnchor, setRemoveSeasonMenuAnchor] = useState(null);
  const handleRemoveSeasonMenuOpen = e => setRemoveSeasonMenuAnchor(e.currentTarget);
  const handleRemoveSeasonClick = sNum => {
    handleRemoveSeason(sNum);
    setRemoveSeasonMenuAnchor(null);
  };

  return (
    <>
      <Button
        variant={'outlined'}
        fullWidth
        color={'default'}
        size={'small'}
        onClick={
          isSelected ? handleRemoveSeasonMenuOpen : () => handleAddSeason(seasonNum, showData)
        }
      >
        {isSelected ? 'Selected' : `Select Season ${seasonNum}`}
      </Button>
      <PopoverMenu
        anchorEl={removeSeasonMenuAnchor}
        onClose={() => setRemoveSeasonMenuAnchor(null)}
        items={[
          { text: 'Deselect', onClick: () => handleRemoveSeasonClick(seasonNum) }
        ]}
      />
    </>
  );
};

export default SelectSeasonButton;
