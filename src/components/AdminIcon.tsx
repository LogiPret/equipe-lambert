import React from 'react'

// Square icon version for spots that expect a square aspect (e.g., collapsed sidebar)
const AdminIcon: React.FC = () => (
  <img
    src="/favicon.svg"
    alt="Équipe Lambert Icon"
    style={{ height: 28, width: 28, display: 'block', objectFit: 'contain' }}
  />
)

export default AdminIcon
