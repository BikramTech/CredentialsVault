import React from 'react';

import { HeaderSearchBoxScreen } from '../screens';

const HeaderSearchBox = ({searchBoxTextValue, onClearSearchBox, onToggleSearch, onSearchBoxTextChange}) => {

    return <HeaderSearchBoxScreen searchBoxTextValue={searchBoxTextValue} onClearSearchBox={onClearSearchBox} onToggleSearch={onToggleSearch} onSearchBoxTextChange={onSearchBoxTextChange} />
}

export default HeaderSearchBox;