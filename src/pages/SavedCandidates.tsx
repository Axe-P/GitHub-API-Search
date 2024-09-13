import { useState, useEffect } from 'react';
// Importing useState and useEffect from react.
import { Candidate } from '../interfaces/Candidate.interface';
// Adding the Candidate interface from the interfaces folder to define how data will be retrieved.

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  // Defining the initial state of the savedCandidates

  useEffect(() => {
    const candidatesFromStorage = localStorage.getItem('savedCandidates');
    if (candidatesFromStorage) {
      setSavedCandidates(JSON.parse(candidatesFromStorage));
    }
  }, []);
  // Using useEffect to grab data from local storage and "send" it to the savedCandidates data.

  const handleRemove = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    // This is grabbing the information from the savedCandidates, checking the index on what candidate we are wanting to remove.
    // Than grabbing the rest of the candidates to be "saved", this is where we're using the filter method to accomplish this.
    setSavedCandidates(updatedCandidates);
    // Setting SavedCandidates to match the updatedCandidates. (I.E. Removing them)
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    // Setting the localStorage to match the SavedCandidates. (So they're actually removed.)
  };

  if (savedCandidates.length === 0) {
    return <p>No potential candidates saved yet.</p>;
  }
  // Just checking to see if there is any data, if not than "No potential..." will be displayed.

  return (
    // This is what you get to see! This is what is being displayed on the /SavedCandidates page.
    <div>
      <h1>Potential Candidates</h1>
      <ul>
        {savedCandidates.map((candidate, index) => (
          <li key={index}>
            <h2>{candidate.name}</h2>
            <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location}</p>
            <p>Company: {candidate.company || 'N/A'}</p>
            <p>Email: {candidate.email || 'N/A'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
            {/* This is displaying all of the information just like the index page! */}
            <button onClick={() => handleRemove(index)}>Remove</button>
            {/* This button has an event listener attached to it, to remove the candidate. Please see lines 18 through 26 for further information. */}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting everything to then be rendered.
export default SavedCandidates;