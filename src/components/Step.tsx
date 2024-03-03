import { useState } from "react";

interface DataItem {
  date: string;
  distance: number;
}

const Step = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const addData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const date = (e.target as HTMLFormElement).querySelector(
      'input[name="date"]'
    ) as HTMLInputElement;
    const distance = (e.target as HTMLFormElement).querySelector(
      'input[name="distance"]'
    ) as HTMLInputElement;

    const currentDate = new Date();
    const inputDate = new Date(date.value);

    if (inputDate > currentDate) {
      alert("Введите корректную дату");
      return;
    }

    let existingIndex = data.findIndex((item) => item.date === date.value);

    if (existingIndex === -1) {
      existingIndex = data.length;
    }

    const updatedData = [...data];
    updatedData[existingIndex] = {
      date: date.value,
      distance: updatedData[existingIndex] ? updatedData[existingIndex].distance + parseFloat(distance.value) : parseFloat(distance.value),
    };
    setData(updatedData);

    date.value = "";
    distance.value = "";
  };

  const deleteData = (date: string) => {
    setData((prevData) => prevData.filter((item) => item.date !== date));
  };

  return (
    <>
      <h1>Трекер тренировок</h1>

      <form onSubmit={addData}>
        <label htmlFor="date">Дата:</label>
        <input type="date" id="date" name="date" required />

        <label htmlFor="distance">Пройденное расстояние (км):</label>
        <input type="number" id="distance" name="distance" min="0" required />

        <input type="submit" value="Добавить" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройденное расстояние (км)</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.distance}</td>
              <td>
                <button onClick={() => deleteData(item.date)}>✘</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Step;
