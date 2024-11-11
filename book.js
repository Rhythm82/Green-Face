        // Function to handle increment/decrement of people and rooms
        const decrementPeople = document.getElementById('decrement-people');
        const incrementPeople = document.getElementById('increment-people');
        const peopleInput = document.getElementById('people');
    
        const decrementRooms = document.getElementById('decrement-rooms');
        const incrementRooms = document.getElementById('increment-rooms');
        const roomsInput = document.getElementById('rooms');
    
        decrementPeople.addEventListener('click', () => {
            if (parseInt(peopleInput.value) > 1) peopleInput.value = parseInt(peopleInput.value) - 1;
        });
    
        incrementPeople.addEventListener('click', () => {
            peopleInput.value = parseInt(peopleInput.value) + 1;
        });
    
        decrementRooms.addEventListener('click', () => {
            if (parseInt(roomsInput.value) > 1) roomsInput.value = parseInt(roomsInput.value) - 1;
        });
    
        incrementRooms.addEventListener('click', () => {
            roomsInput.value = parseInt(roomsInput.value) + 1;
        });
    
        // Calculate and Display Billing Preview
        function calculateBilling() {
            const checkIn = new Date(document.getElementById('check-in').value);
            const checkOut = new Date(document.getElementById('check-out').value);
            const rooms = parseInt(roomsInput.value);
            const perDayRate = 1500;
    
            const timeDifference = checkOut - checkIn;
            const days = timeDifference / (1000 * 60 * 60 * 24);
    
            if (days > 0) {
                const roomCost = days * rooms * perDayRate;
                const billingPreview = `
                    ${days} day(s) = ${days * perDayRate}/-
                    ${rooms} Room(s) = ${roomCost}
                    *including breakfast
                `;
    
                document.getElementById('billing-preview').value = billingPreview; // Update the preview display
                return { totalCost: roomCost, billingPreview };
            } else {
                document.getElementById('billing-preview').value = "Invalid dates selected";
                return { totalCost: 0, billingPreview: "Invalid dates selected" };
            }
        }
    
        document.getElementById('check-in').addEventListener('change', calculateBilling);
        document.getElementById('check-out').addEventListener('change', calculateBilling);
        roomsInput.addEventListener('change', calculateBilling);
    
        // Book Now Button Event - PDF and Text Logging
        document.getElementById('book-now').addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const email = document.getElementById('email').value;
            const gender = document.getElementById('gender').value;
            const phone = document.getElementById('phone').value;
            const idDetail = document.getElementById('id-detail').value;
            const { totalCost, billingPreview } = calculateBilling();
    
            const bookingDetails = `
                Name: ${name}
                Age: ${age}
                Email: ${email}
                Gender: ${gender}
                Phone: ${phone}
                ID Detail: ${idDetail}
                Billing Preview:
                ${billingPreview}
                Total Cost: ₹${totalCost}
            `;
    
            // Save to Text File (Owner's End)
            const blob = new Blob([bookingDetails], { type: 'text/plain' });
            const textLink = document.createElement('a');
            textLink.href = URL.createObjectURL(blob);
            textLink.download = `${name}_Booking_Details.txt`;
            textLink.click();
    
            // Generate PDF for User
            const pdfDoc = new jsPDF();
            pdfDoc.setFontSize(16);
            pdfDoc.text("Green Face Hotel Booking", 10, 10);
            pdfDoc.setFontSize(12);
            pdfDoc.text("Booking Details:", 10, 20);
    
            // Add booking details to the PDF
            pdfDoc.text(`Name: ${name}`, 10, 30);
            pdfDoc.text(`Age: ${age}`, 10, 40);
            pdfDoc.text(`Email: ${email}`, 10, 50);
            pdfDoc.text(`Gender: ${gender}`, 10, 60);
            pdfDoc.text(`Phone: ${phone}`, 10, 70);
            pdfDoc.text(`ID Verification: ${idDetail}`, 10, 80);
            
            // Add billing preview to the PDF
            pdfDoc.text("Billing Preview:", 10, 90);
            const billingLines = billingPreview.split("\n");
            let yPosition = 100;
            billingLines.forEach(line => {
                pdfDoc.text(line.trim(), 10, yPosition);
                yPosition += 10;
            });
    
            pdfDoc.text(`Total Cost: ₹${totalCost}`, 10, yPosition + 10);
    
            // Save the PDF with a filename based on the user's name
            pdfDoc.save(`${name}_Booking_Details.pdf`);
        });
