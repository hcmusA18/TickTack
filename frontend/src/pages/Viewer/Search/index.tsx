import React, { FC } from 'react'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { SearchBar, SearchList } from './components'

interface SearchPageProps extends AppStackScreenProps<'Search'> {}

export const SearchPage: FC<SearchPageProps> = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} navigation={props.navigation} />
      <SearchList searchQuery={searchQuery} />
    </Screen>
  )
}
