import React from 'react';

// const members = [
//   {
//     firstName: 'Courtney',
//     lastName: 'Marsh',
//     bio: ``,
//     faveGen: ``,
//     favePick: ``,
//     wantsToRed: ``,
//   },
//   {
//     firstName: 'Melissa',
//     lastName: 'Mahon',
//     bio: ``,
//     faveGen: ``,
//     favePick: ``,
//     wantsToRed: ``,
//   },
//   {
//     firstName: 'Melissa',
//     lastName: 'Veloz',
//     bio: ``,
//     faveGen: ``,
//     favePick: ``,
//     wantsToRed: ``,
//   },
//   {
//     firstName: 'Kate',
//     lastName: 'Quinn',
//     bio: ``,
//     faveGen: ``,
//     favePick: ``,
//     wantsToRed: ``,
//   },
//   {
//     firstName: 'Laura',
//     lastName: 'Yarusavage',
//     bio: ``,
//     faveGen: ``,
//     favePick: ``,
//     wantsToRed: ``,
//   },
//   {
//     firstName: 'Sarah',
//     lastName: 'Voris',
//     bio: ``,
//     faveGen: ``,
//     favePick: ``,
//     wantsToRed: ``,
//   },
// ];

// export const MemberList = (props) => {
//   return (
//     <div>
//       {members.map((member, idx) => {
//         return (
//           <div key={idx}>
//             {member.firstName} {member.lastName}
//           </div>
//         );
//       })}
//       <div>
//         <button onClick={props.getMembers}>Get Members</button>
//       </div>
//     </div>
//   );
// };

const MemberList = (props) => {
  return (
    <div>
      {props.members.map((member, idx) => {
        return <div key={idx}>{member.name}</div>;
      })}
    </div>
  );
};

export default MemberList;
