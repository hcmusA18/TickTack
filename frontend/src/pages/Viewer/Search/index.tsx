import React, { FC } from 'react'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { SearchBar, SearchList } from './components'

interface SearchPageProps extends AppStackScreenProps<'Search'> {}

export const SearchPage: FC<SearchPageProps> = (props) => {
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <SearchBar navigation={props.navigation} />
      <SearchList navigation={props.navigation} />
    </Screen>
  )
}
