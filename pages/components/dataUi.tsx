import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import debounce from "lodash/debounce";

const people = [
  {
    id:1,
    title: "Lindsay Walton",
    description: "Front-end Developer",
    schedule: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function dataUi() {
    interface Person {
        id?: number;
        title: string;
        description: string;
        schedule: string;
        role: string;
        repeat: string;
      }
      type UpdatedPerson = ({
        id?: number;
        title: string;
        description: string;
        schedule: string;
        role: string;
        repeat?: string; // Make repeat property optional
    })[]

    
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const TrashIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="w-6 h-6 text-gray-800"
    >
      <path
        fillRule="evenodd"
        d="M5 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1h2a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2h2V5zM7.293 14.707a1 1 0 1 1 1.414-1.414L10 14.586l1.293-1.293a1 1 0 1 1 1.414 1.414L11.414 16l1.293 1.293a1 1 0 1 1-1.414 1.414L10 17.414l-1.293 1.293a1 1 0 1 1-1.414-1.414L8.586 16 7.293 14.707z"
      />
    </svg>
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [formData, setFormData] = useState<Person>({
    title: "",
    description: "",
    schedule: "",
    role: "",
    repeat: "",
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [peopleData, setPeopleData] = useState(people);

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (index: number) => {
    const personToEdit = peopleData[index];
    
    const personWithRepeat = { ...personToEdit, repeat: '' };
    
    setFormData(personWithRepeat);
    toggleDropdown();
  };
  

  const handleDelete = (index: number) => {
    const updatedPeople = [...peopleData];
    updatedPeople.splice(index, 1);
    setPeopleData(updatedPeople);
  };
  const debouncedSearch = debounce((term: string) => {
    const filteredPeople = people.filter(
      (person) =>
        person.title.toLowerCase().includes(term) ||
        person.description.toLowerCase().includes(term) ||
        person.schedule.toLowerCase().includes(term) ||
        person.role.toLowerCase().includes(term)
    );

    setPeopleData(filteredPeople);
  }, 300);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    debouncedSearch(searchTerm);
  };

  
  const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
  
    // Check if in edit mode
    if (formData.id !== undefined) {
      // Update existing person
      const updatedPeople: UpdatedPerson[] = peopleData.map((person) =>
        person.id === formData.id ? { ...formData } : person
      );
      setPeopleData(updatedPeople);
    } else {
      // Add new person
      setPeopleData([...peopleData, { ...formData, id: Date.now() }]);
    }
  
    // Reset form data and close dropdown
    setFormData({
      title: "",
      description: "",
      schedule: "",
      role: "",
      repeat: "",
    });
    setIsDropdownOpen(false);
  };
  
  
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full mt-3">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="relative mt-2 w-1/4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-5-5m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => handleSearch(e as React.ChangeEvent<HTMLInputElement>)}

              className="block w-full rounded-md border-0 py-1.5 pl-8 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="search"
            />
          </div>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none relative inline-block text-left">
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M15.1667 8C15.1667 11.958 11.958 15.1667 8 15.1667C4.04196 15.1667 0.833333 11.958 0.833333 8C0.833333 4.04196 4.04196 0.833333 8 0.833333C11.958 0.833333 15.1667 4.04196 15.1667 8Z"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2">Add</span>
          </button>

          {isDropdownOpen && (
            <form onSubmit={handleSubmit}>
              <div
                className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-96 p-4"
                style={{
                  left: "0",
                  right: "auto",
                  maxWidth: "calc(100vw - 16px)",
                }}
              >
                <div className="flex flex-col mb-4">
                  <div className="flex items-center mb-3">
                    <label className="text-sm w-20 mr-4 font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Title
                    </label>
                    <input
                      value={formData.title}
                      type="text"
                      name="title"
                      onChange={handleInputChange}
                      placeholder="Enter text"
                      className="flex-1 focus:ring-primary bg-gray-100 focus:border-sky-500 px-4 py-3 sm:text-sm border-0 border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex items-center mb-3">
                    <label className="text-sm w-20 mr-4 font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      name="description"
                      onChange={handleInputChange}
                      placeholder="Enter description"
                      className="flex-1 focus:ring-primary bg-gray-100 focus:border-sky-500 px-4 py-3 sm:text-sm border-0 border-gray-300 rounded-md"
                    ></textarea>
                  </div>

                  <div className="flex items-center mb-3">
                    <label className="text-sm w-20 mr-4 font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Time
                    </label>
                    <input
                      value={formData.schedule}
                      type="time"
                      name="schedule"
                      onChange={handleInputChange}
                      className="flex-1 focus:ring-primary bg-gray-100 focus:border-sky-500 px-4 py-3 sm:text-sm border-0 border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex items-center mb-3">
                    <label className="text-sm w-20 mr-4 font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Frequency
                    </label>
                    <select
                      name="role"
                      onChange={handleInputChange}
                      value={formData.role}
                      className="p-2 bg-gray-100 border-0 border-gray-300 rounded-md"
                    >
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </select>
                  </div>

                  <div className="flex items-center mb-3">
                    <label className="text-sm w-20 mr-4 font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Repeat
                    </label>
                    <select
                      name="repeat"
                      value={formData.repeat}
                      onChange={handleInputChange}
                      className="p-2 bg-gray-100 border-0 border-gray-300 rounded-md"
                    >
                      <option value="day">Sunday</option>
                      <option value="week">Monday</option>
                      <option value="month">Tuesday</option>
                      <option value="month">Wedsday</option>
                      <option value="month">Thursday</option>
                      <option value="month">Friday</option>
                      <option value="month">Saturday</option>
                    </select>
                  </div>

                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-secondary focus:outline-none"
                    type="submit"
                  >
                    Done
                  </button>
                  <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 bg-primary hover:bg-secondary focus:outline-none " onClick={toggleDropdown}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Subject
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                       Schedule
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {peopleData.map((person, index) => (
                    <tr key={person.title}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.schedule}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <div onClick={() => handleEdit(index)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </div>
                          <div onClick={() => handleDelete(index)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

