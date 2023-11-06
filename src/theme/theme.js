// theme.js
export const theme = {
    colors: {
      primary: '#0000FF', // Blue color for button backgrounds and other elements
      textPrimary: '#fff', // White color for text on primary buttons
      textSecondary: '#a9a9a9', // Light gray color for secondary text
      buttonBorder: '#0000FF', // Blue color for button borders
      separator: 'lightgray', // Color for separators
    },
    styles: {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
      },
      input: {
        height: 50, // Adjusted height to match the image
        width: '100%',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#000', // Border color for input
        padding: 10,
        backgroundColor: '#fff', // Background color for input
      },
  
      logo: {
        width: 100,
        height: 125,
        marginBottom: 48, // Adjust as needed
      },
      button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#0000FF', // Blue color for the button background
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
  
      // Add other common styles here
    },
  };
  