-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-06-2025 a las 03:20:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `charlestherapy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bigfive`
--

CREATE TABLE `bigfive` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `neuroticismo` decimal(4,2) NOT NULL,
  `extraversion` decimal(4,2) NOT NULL,
  `apertura` decimal(4,2) NOT NULL,
  `amabilidad` decimal(4,2) NOT NULL,
  `responsabilidad` decimal(4,2) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bigfive`
--

INSERT INTO `bigfive` (`id`, `id_usuario`, `neuroticismo`, `extraversion`, `apertura`, `amabilidad`, `responsabilidad`, `fecha_creacion`) VALUES
(1, 5, 3.20, 4.10, 2.80, 4.50, 3.90, '2025-05-29 06:25:12'),
(2, 5, 3.20, 4.10, 2.80, 4.50, 3.90, '2025-05-29 06:38:04'),
(3, 1, 3.20, 1.30, 1.00, 1.00, 1.00, '2025-05-29 06:40:36'),
(4, 1, 3.00, 3.00, 2.00, 2.00, 2.00, '2025-05-29 07:11:11'),
(5, 1, 4.00, 4.00, 5.00, 2.00, 3.00, '2025-05-29 07:16:52'),
(6, 3, 3.60, 3.00, 5.00, 4.00, 4.00, '2025-06-03 00:30:49'),
(7, 3, 3.60, 3.00, 5.00, 4.00, 4.00, '2025-06-03 00:30:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `especialista_id` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` text NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `paciente_id`, `especialista_id`, `fecha`, `estado`, `descripcion`) VALUES
(2, 5, 4, '2025-05-30 10:00:00', 'proxima', 'Paciente Loquito'),
(3, 1, 4, '2025-05-30 09:00:00', 'cancelada', 'Juan\r\n'),
(4, 3, 4, '2025-05-28 11:00:00', 'terminada', 'a\r\n'),
(5, 2, 4, '2025-05-28 12:00:00', 'en confirmacion', 'a\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_especialista` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones`
--

CREATE TABLE `observaciones` (
  `id_observacion` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL,
  `observacion` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resumen`
--

CREATE TABLE `resumen` (
  `id_resumen` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contenido` text DEFAULT NULL,
  `resumen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resumen`
--

INSERT INTO `resumen` (`id_resumen`, `id_usuario`, `fecha`, `contenido`, `resumen`) VALUES
(1, 3, '2025-06-02', 'Hola chatsito te quiero comentar que hoy tuve un dia muy bueno ya que escogi la especialidad que toamre en mi carrera de ingenieria en computación\nTambien te quiero comentar que estoy muy contento por que golearon al america.', 'El usuario comienza su mensaje compartiendo su emoción por haber escogido la especialidad que tomará en su carrera de ingeniería en computación, lo que le hizo tener un buen día. Luego, expresa su alegría por la victoria de su equipo favorito, ya que golearon al América. En ambos casos, se percibe un tono de felicidad y satisfacción por logros personales y eventos deportivos. Ambos hechos parecen tener un impacto positivo en su estado de ánimo, lo que indica que está viviendo momentos de satisfacción y alegría.'),
(2, 3, '2025-06-02', 'Hola chatsito te quiero comentar que hoy tuve un dia muy bueno ya que escogi la especialidad que toamre en mi carrera de ingenieria en computación\nTambien te quiero comentar que estoy muy contento por que golearon al america.\n Hola, tambien quisiera conmentarte que mi crush de la universidad hoy me saludo y yo de manera bien nerviosa devolvi el saludo, me siento akward\nSoy demasiado introvertido, me gustaria me ayudaras a plantear una solucion', 'Hola carlos_vega,\n\nMe alegra escuchar que tu día ha sido muy bueno y que has escogido la especialidad que tomarás en tu carrera de ingeniería en computación. ¡Felicidades por ese logro! Es genial saber que estás tomando decisiones importantes para tu futuro.\n\nAdemás, me alegro de que hayas disfrutado la victoria de tu equipo goleando al América. Es maravilloso celebrar los triunfos de nuestros equipos favoritos.\n\nEntiendo que puede ser un poco incómodo sentirse nervioso al saludar a tu crush en la universidad. Es completamente normal sentirse así en situaciones como esta. Te sugiero recordar que la otra persona también puede estar nerviosa y tratar de relajarte. Ser auténtico y genuino siempre es la mejor opción.\n\nEn cuanto a tu timidez e introvertida, es importante recordar que todos tenemos diferentes formas de relacionarnos con los demás y eso está bien. Si te gustaría plantear una solución para sentirte más cómodo en situaciones sociales, te recomendaría empezar poco a poco. Puedes intentar participar en actividades grupales o unirte a clubes en la universidad. También es útil practicar la comunicación asertiva para expresar tus ideas y opiniones de forma clara.\n\nRecuerda que cada paso que des para superar tu timidez es un avance en tu crecimiento personal. ¡Ánimo carlos_vega! Estoy seguro de que con esfuerzo y practica, pronto te sentirás más cómodo interactuando con los demás.\n\nSi necesitas más consejos o apoyo, aquí estaré para ayudarte en lo que necesites.\n\n¡Sigue adelante, carlos_vega! ¡Tienes todo el potencial para brillar!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id_sesion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_creacion` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sesiones`
--

INSERT INTO `sesiones` (`id_sesion`, `id_usuario`, `contenido`, `fecha_creacion`) VALUES
(1, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(2, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(3, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(4, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(5, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(6, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(7, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(8, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(9, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(10, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(11, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(12, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(13, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"},{\"role\":\"user\",\"content\":\"Ayudame a recoger mi basura dandome una respuesta quea horre tokens 1 sola palabra\"},{\"role\":\"assistant\",\"content\":\"Claro.\",\"animatedContent\":\"Claro.\"}]', '2025-06-01'),
(14, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"Hola, monosilabo\"},{\"role\":\"assistant\",\"content\":\"Hola (?)\",\"animatedContent\":\"Hola (?)\"}]', '2025-06-01'),
(15, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"hola pta monosilaba\"},{\"role\":\"assistant\",\"content\":\"Hola, ¿cómo estás? ¿En qué puedo ayudarte hoy?\",\"animatedContent\":\"Hola, ¿cómo estás? ¿En qué puedo ayudarte hoy?\"}]', '2025-06-01'),
(16, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?\"}]', '2025-06-01'),
(17, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(18, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(19, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(20, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(21, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(22, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"},{\"role\":\"user\",\"content\":\"Hoollaaa\"},{\"role\":\"assistant\",\"content\":\"¡Hola! ¿Cómo estás? ¿En qué puedo ayudarte hoy?\",\"animatedContent\":\"¡Hola! ¿Cómo estás? ¿En qué puedo ayudarte hoy?\"}]', '2025-06-01'),
(23, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"Alo\"},{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte hoy?\",\"animatedContent\":\"Hola, ¿en qué puedo ayudarte hoy?\"}]', '2025-06-01'),
(24, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"Hola como esta tidoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"},{\"role\":\"assistant\",\"content\":\"¡Hola! Estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?\",\"animatedContent\":\"¡Hola! Estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?\"}]', '2025-06-01'),
(25, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(26, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?\"}]', '2025-06-01'),
(27, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(28, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?\"},{\"role\":\"user\",\"content\":\"recuerdas algo de alguna sesionde chat previa?\"},{\"role\":\"assistant\",\"content\":\"Lo siento, pero como soy una inteligencia artificial, no tengo la capacidad de recordar sesiones anteriores. Pero estaré encantado de ayudarte con cualquier pregunta que tengas sobre perfiles psicométricos. ¿En qué puedo ayudarte hoy?\",\"animatedContent\":\"Lo siento, pero como soy una inteligencia artificial, no tengo la capacidad de recordar sesiones anteriores. Pero estaré encantado de ayudarte con cualquier pregunta que tengas sobre perfiles psicométricos. ¿En qué puedo ayudarte hoy?\"}]', '2025-06-01'),
(29, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(30, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-01'),
(31, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?\"}]', '2025-06-01'),
(32, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?\"}]', '2025-06-01'),
(33, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(34, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"hola amorfo\"},{\"role\":\"assistant\",\"content\":\"Hola, ¿cómo estás? ¿Hay algo específico en lo que necesitas ayuda o quieres charlar de algo en particular? Estoy aquí para ayudarte en lo que necesites.\",\"animatedContent\":\"Hola, ¿cómo estás? ¿Hay algo específico en lo que necesitas ayuda o quieres charlar de algo en particular? Estoy aquí para ayudarte en lo que necesites.\"}]', '2025-06-01'),
(35, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"Hola eres capaz de alacenar este chayt, responde 1 o 0\"},{\"role\":\"assistant\",\"content\":\"Lo siento, pero como asistente de IA, no tengo la capacidad de almacenar información de conversaciones anteriores. Estoy diseñado para mantener la privacidad y confidencialidad de las interacciones. ¿En qué más puedo ayudarte hoy?\",\"animatedContent\":\"Lo siento, pero como asistente de IA, no tengo la capacidad de almacenar información de conversaciones anteriores. Estoy diseñado para mantener la privacidad y confidencialidad de las interacciones. ¿En qué más puedo ayudarte hoy?\"}]', '2025-06-01'),
(36, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?\"}]', '2025-06-01'),
(37, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"helou\"},{\"role\":\"assistant\",\"content\":\"Hola! ¿En qué puedo ayudarte hoy?\",\"animatedContent\":\"Hola! ¿En qué puedo ayudarte hoy?\"}]', '2025-06-01'),
(38, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"}]', '2025-06-01'),
(39, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"Hola chatsito te quiero comentar que hoy tuve un dia muy bueno ya que escogi la especialidad que toamre en mi carrera de ingenieria en computación\"},{\"role\":\"assistant\",\"content\":\"Lo siento, hubo un error al contactar a OpenAI.\"}]', '2025-06-02'),
(40, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-02'),
(41, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-02'),
(42, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-02'),
(43, 1, '[{\"role\":\"assistant\",\"content\":\"Hola, ¿en qué puedo ayudarte?\"}]', '2025-06-02'),
(44, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\"Tambien te quiero comentar que estoy muy contento por que golearon al america.\"},{\"role\":\"assistant\",\"content\":\"Lo siento, hubo un error al contactar a OpenAI.\"}]', '2025-06-02'),
(45, 3, '[{\"role\":\"assistant\",\"content\":\"Hola, como puedo ayudarte (?)\"},{\"role\":\"user\",\"content\":\" Hola, tambien quisiera conmentarte que mi crush de la universidad hoy me saludo y yo de manera bien nerviosa devolvi el saludo, me siento akward\"},{\"role\":\"assistant\",\"content\":\"¡Hola carlos_vega! ¡Qué emoción que tu crush te haya saludado! Es completamente normal sentirse un poco nervioso en ese tipo de situaciones. Recuerda que todos hemos pasado por momentos así y es parte de ser humano.\\n\\nSi te sientes cómodo, tal vez podrías intentar entablar una conversación la próxima vez que te encuentres con tu crush en la universidad. ¡Quién sabe a dónde podría llevar esa charla! Lo importante es ser uno mismo y disfrutar del momento.\\n\\n¡Ánimo! ¡Tú puedes! Si necesitas algún consejo adicional, ¡aquí estoy para ayudarte!\",\"animatedContent\":\"¡Hola carlos_vega! ¡Qué emoción que tu crush te haya saludado! Es completamente normal sentirse un poco nervioso en ese tipo de situaciones. Recuerda que todos hemos pasado por momentos así y es parte de ser humano.\\n\\nSi te sientes cómodo, tal vez podrías intentar entablar una conversación la próxima vez que te encuentres con tu crush en la universidad. ¡Quién sabe a dónde podría llevar esa charla! Lo importante es ser uno mismo y disfrutar del momento.\\n\\n¡Ánimo! ¡Tú puedes! Si necesitas algún consejo adicional, ¡aquí estoy para ayudarte!\"},{\"role\":\"user\",\"content\":\"Soy demasiado introvertido, me gustaria me ayudaras a plantear una solucion\"},{\"role\":\"assistant\",\"content\":\"Entiendo cómo te sientes, carlos_vega. Ser introvertido puede hacer que sea más desafiante iniciar conversaciones o interactuar con otras personas, pero recuerda que todos tenemos cualidades únicas que nos hacen especiales.\\n\\nUna forma de superar la timidez es practicar y tomar pequeños pasos. Puedes empezar por practicar con amigos cercanos o familiares, o incluso practicar frente al espejo. También puedes establecer metas pequeñas, como saludar a un compañero de clase o hacer una pregunta a un profesor.\\n\\nAdemás, recuerda que la otra persona también puede sentirse nerviosa, ¡así que no te preocupes demasiado! Intenta mantener una mentalidad positiva y recuerda que la práctica constante puede ayudarte a ganar confianza.\\n\\nSi sientes que necesitas más apoyo o técnicas específicas, no dudes en buscar recursos como libros, cursos en línea o incluso hablar con un profesional de la salud mental. Estoy aquí para apoyarte en este proceso, ¡así que no dudes en compartir cualquier inquietud que tengas! ¡Tú puedes lograrlo!\",\"animatedContent\":\"Entiendo cómo te sientes, carlos_vega. Ser introvertido puede hacer que sea más desafiante iniciar conversaciones o interactuar con otras personas, pero recuerda que todos tenemos cualidades únicas que nos hacen especiales.\\n\\nUna forma de superar la timidez es practicar y tomar pequeños pasos. Puedes empezar por practicar con amigos cercanos o familiares, o incluso practicar frente al espejo. También puedes establecer metas pequeñas, como saludar a un compañero de clase o hacer una pregunta a un profesor.\\n\\nAdemás, recuerda que la otra persona también puede sentirse nerviosa, ¡así que no te preocupes demasiado! Intenta mantener una mentalidad positiva y recuerda que la práctica constante puede ayudarte a ganar confianza.\\n\\nSi sientes que necesitas más apoyo o técnicas específicas, no dudes en buscar recursos como libros, cursos en línea o incluso hablar con un profesional de la salud mental. Estoy aquí para apoyarte en este proceso, ¡así que no dudes en compartir cualquier inquietud que tengas! ¡Tú puedes lograrlo!\"}]', '2025-06-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` text NOT NULL,
  `correo` text NOT NULL,
  `password` text NOT NULL,
  `rol` text NOT NULL,
  `bigFive` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `correo`, `password`, `rol`, `bigFive`) VALUES
(1, 'juan_perez', 'juan@example.com', '1234abcd', 'admin', 1),
(2, 'maria_rios', 'maria@example.com', 'abcd1234', 'paciente', 0),
(3, 'carlos_vega', 'carlos@example.com', 'passcarlos', 'paciente', 0),
(4, 'ana_soto', 'ana@example.com', 'anasegura', 'especialista', 0),
(5, 'luis_morales', 'luis@example.com', 'luisclave', 'paciente', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bigfive`
--
ALTER TABLE `bigfive`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_paciente` (`paciente_id`),
  ADD KEY `id_especialista` (`especialista_id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- Indices de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD PRIMARY KEY (`id_observacion`),
  ADD KEY `id_cita` (`id_cita`);

--
-- Indices de la tabla `resumen`
--
ALTER TABLE `resumen`
  ADD PRIMARY KEY (`id_resumen`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id_sesion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bigfive`
--
ALTER TABLE `bigfive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  MODIFY `id_observacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resumen`
--
ALTER TABLE `resumen`
  MODIFY `id_resumen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id_sesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bigfive`
--
ALTER TABLE `bigfive`
  ADD CONSTRAINT `bigfive_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`especialista_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`id_cita`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `resumen`
--
ALTER TABLE `resumen`
  ADD CONSTRAINT `resumen_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
