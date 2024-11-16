import  { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const questions = [
  { label: "Please select your gender", key: "GENDER", type: "dropdown", options: ["Male", "Female"] },
  { label: "What is your age?", key: "AGE", type: "number" },
  { label: "Do you smoke?", key: "SMOKING_STATUS", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you have yellow fingers?", key: "YELLOW_FINGERS", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you experience anxiety?", key: "ANXIETY", type: "dropdown", options: ["Yes", "No"] },
  { label: "Are you influenced by peer pressure?", key: "PEER_PRESSURE", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you have any chronic disease?", key: "CHRONIC_DISEASE", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you feel fatigue?", key: "FATIGUE", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you have any allergies?", key: "ALLERGY", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you experience wheezing?", key: "WHEEZING", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you consume alcohol?", key: "ALCOHOL_CONSUMING", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you have a persistent cough?", key: "COUGHING", type: "dropdown", options: ["Yes", "No"] },
  { label: "Do you experience shortness of breath?", key: "SHORTNESS_OF_BREATH", type: "dropdown", options: ["Yes", "No"] },
];

function ChatBotWhatsAppStyle() {
  const initialFormData = Object.fromEntries(questions.map(q => [q.key, '']));
  const [formData, setFormData] = useState(initialFormData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [guidance, setGuidance] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserInput = (value) => {
    const question = questions[currentQuestion];
    const key = question.key;

    let processedValue = value;
    if (key === "GENDER") {
      processedValue = value === "Male" ? 1 : value === "Female" ? "2" : value;
    }

    if (value === "Yes") {
      processedValue = "2";
    } else if (value === "No") {
      processedValue = "1";
    }

    if (key === "AGE") {
      processedValue = parseInt(value, 10);
    }

    setFormData({ ...formData, [key]: processedValue });

    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'bot', text: question.label }
    ]);

    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', text: value }
    ]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
      setIsCompleted(true);
    }
  };

  const handleSubmit = async () => {
    if (!formData.SHORTNESS_OF_BREATH) {
      formData.SHORTNESS_OF_BREATH = "1";
    }

    try {
      console.log(formData);
      const response = await axios.post('https://lung-disease-prediction-api.onrender.com/predict', formData);
      setResult(response.data.prediction);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: `Prediction: ${response.data.prediction}` }
      ]);

      if (response.data.prediction === "YES") {
        setGuidance(
          "It is highly recommended that you consult with a doctor immediately for further diagnosis and tests. Lung cancer is a serious condition, and early detection can significantly improve treatment outcomes. Please do not delay in seeking professional medical help."
        );
      } else {
        setGuidance(
          "You are not showing any immediate signs of lung cancer. However, it's important to remain proactive about your health. Consider adopting a healthy lifestyle by avoiding smoking, staying active, and getting regular medical checkups. Maintaining a balanced diet and reducing exposure to pollutants can further reduce your risk."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const typingEffect = (text) => {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: text.length * 0.1, ease: "easeInOut" },
    };
  };

  const typingDotsEffect = (isTyping) => {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'ease-in-out'
      },
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <motion.h2
          className="text-2xl font-bold text-center text-gray-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Lung Cancer Prediction Chat
        </motion.h2>
        <motion.div
          className="h-96 overflow-y-auto p-4 bg-gray-800 rounded-lg"
          style={{ maxHeight: '400px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex mb-2 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className={`px-4 py-2 rounded-lg ${msg.sender === 'bot' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                {...typingEffect(msg.text)}
              >
                {msg.text}
              </motion.div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              className="px-4 py-2 rounded-lg bg-gray-400 text-gray-800"
              {...typingDotsEffect(isTyping)}
            >
              Typing<span className="animate-pulse">...</span>
            </motion.div>
          )}
          <div ref={chatRef}></div>
        </motion.div>

        <div className="mt-4">
          {!isCompleted && questions.length > 0 && currentQuestion < questions.length && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {questions[currentQuestion].label}
              </label>
              {questions[currentQuestion].type === "dropdown" && (
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData[questions[currentQuestion].key] || ""}
                  onChange={(e) => handleUserInput(e.target.value)}
                >
                  <option value="">Select...</option>
                  {questions[currentQuestion].options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {questions[currentQuestion].type === "number" && (
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData[questions[currentQuestion].key] || ""}
                  onChange={(e) => handleUserInput(e.target.value)}
                  min="1"
                />
              )}
            </motion.div>
          )}
        </div>

        {isCompleted && (
         <div className="mt-4 bg-gradient-to-r from-gray-500 via-teal-500 to-green-500 text-black text-bold p-6 rounded-lg shadow-lg">
         <motion.h3
           className="text-2xl font-semibold mb-3"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
         >
           Prediction: {result}
         </motion.h3>
         <p className="text-md">{guidance}</p>
       </div>

        )}
      </div>
    </div>
  );
}

export default ChatBotWhatsAppStyle;
