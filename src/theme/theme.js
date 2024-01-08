// theme.js
export const theme = {
    colors: {
      primary: '#800080', // Changed to purple for primary elements
      textPrimary: '#fff', // White color for text on primary buttons
      textSecondary: '#a9a9a9', // Light gray color for secondary text
      buttonBorder: '#0000FF', // Blue color for button borders
      separator: 'lightgray', // Color for separators
      action: '#0000FF',
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
        marginBottom: 48, 
      },
      button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#5D3FD3', 
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
      header: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 8,
      },
    },
  };
  