import { createTheme } from '@material-ui/core/styles' 
//import { pink } from '@material-ui/core/colors'
import { orange } from '@material-ui/core/colors'
const theme = createTheme({ 
typography: {
useNextVariants: true, 
},
palette: {
primary: {
light: '#8b99a5', 
main: '#364f5b', 
dark: '#364d58', 
contrastText: '#fff',
},
secondary: {
light: '#9a9a9a', 
main: '#ff4081', 
dark: '#474747', 
contrastText: '#000',
},
openTitle: '#1d5174', 
protectedTitle: orange['400'], 
type: 'light'
} 
})
export default theme

