import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function PropertyMenu() {
  return (
    <div className='w-30 inline-block bg-white-500 hover:bg-light-brown text-custom-gray py-2 px-2 rounded text-center'>
      <Menu>

        <div>
          <MenuButton className="inline-flex justify-center hover:bg-light-brown pl-2">Properties
            <svg xmlns="http://www.w3.org/2000/svg" className="px-1 h-6 w-6 pt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </MenuButton>
        </div>


        <MenuItems 
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        anchor="bottom">
          <MenuItem>
            <a className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900" href="/my-properties">
              My Properties
            </a>
          </MenuItem>
          <MenuItem>
            <a className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900" href="/add-property">
              Add a Property
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}