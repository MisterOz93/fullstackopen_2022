import Header from './components/header';
import Content from './components/content';
import Total from './components/total';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total sum={courseParts.map(p => p.exerciseCount).reduce((sum, num) => sum + num, 0)}/>
    </div>
  );
};

export default App;