import React, { useState, useSelector, useEffect } from 'react';

const LibraryPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [libraryData, setLibraryData] = useState([])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <>
      <h1>Library Page</h1>
      <ul>
        {
          (libraryData.length > 0)
            ? libraryData.map(project => (
              <li><a href={project.path}>{project.name}</a></li>
            ))
            : <h1>Nothing to show. Create your first project!</h1>
        }
      </ul>
    </>
  );
}

export default LibraryPage;
