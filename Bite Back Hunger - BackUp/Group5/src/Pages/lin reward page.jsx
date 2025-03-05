import React from 'react';
import './lin reward.css';
import UserLayout from '../Components/UserLayout';

function RewardPage() {
  return (
    <div>
      <UserLayout />  
      
      <div className="container">
        <h1>Rewards Program</h1>
        <p>Earn points by donating food, money, or volunteering. Redeem your points for exclusive rewards!</p>
        
        <h2>Your Points: <span id="points">500</span></h2>
        
        <div className="progress-bar">
          <div className="progress" style={{ width: '50%' }}>50% to Next Reward</div>
        </div>
        
        <h2>Redeem Rewards</h2>
        <div className="reward-list">
          <div className="reward-item">
            <h3>$5 Gift Card</h3>
            <p>500 Points</p>
            <button className="claim-button">Claim</button>
          </div>
          <div className="reward-item">
            <h3>Free Meal</h3>
            <p>1000 Points</p>
            <button className="claim-button">Claim</button>
          </div>
        </div>
        
        <h2>Leaderboard</h2>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>2000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>1800</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Emily Johnson</td>
              <td>1600</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RewardPage;
