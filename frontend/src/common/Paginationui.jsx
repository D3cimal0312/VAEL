import React from 'react'
import { Group, Pagination } from '@mantine/core';

const Paginationui = ({totalPage,page,onPageChange }) => {
  console.log(totalPage,page,"totalPage")
  return (
    <div className='py-10 flex justify-center'> <Pagination.Root
     total={totalPage}
        value={page}               
        onChange={onPageChange} 
        color="#b5713a"
        >
      <Group gap={5} justify="center">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
    </div>
  )
}

export default Paginationui