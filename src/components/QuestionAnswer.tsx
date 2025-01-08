
import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material'

interface QuestionAnswerProps {
  question: string
  answer: string
}

const QuestionAnswer = ({ question, answer }: QuestionAnswerProps) => {
  return (
    <Accordion sx={{ borderRadius: 1, '&.Mui-expanded': { m: 0 } }}>
      <AccordionSummary
        expandIcon={
          <IconButton sx={{ borderRadius: 1 }} color="primary">
            <ExpandMore />
          </IconButton>
        }
        aria-controls="panel2-content"
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default QuestionAnswer
