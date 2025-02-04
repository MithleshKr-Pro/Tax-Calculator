const btn = document.querySelector("#calculate");
const finalSec = document.querySelector("#finalSec");


const ansDiv = document.createElement("div");
ansDiv.classList.add("ansClass");

const currencyFormatter = new Intl.NumberFormat("en-IN",{
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
});

btn.addEventListener("click",()=>{
    let salary = parseFloat(document.querySelector("#salary").value);
    const allowance = parseFloat(document.querySelector("#allowance").value);
    const perks = parseFloat(document.querySelector("#perks").value);
    const othIncome = parseFloat(document.querySelector("#othIncome").value);
    const ppf = parseFloat(document.querySelector("#ppf").value);
    const elss = parseFloat(document.querySelector("#elss").value);
    const lifeInsure = parseFloat(document.querySelector("#lifeInsure").value);
    const healthInsure = parseFloat(document.querySelector("#healthInsure").value);
    const savings = parseFloat(document.querySelector("#savings").value);
    const hra = parseFloat(document.querySelector("#hra").value);
    const std = parseFloat(document.querySelector("#std").value);
    const others = parseFloat(document.querySelector("#others").value);



    let n = 400000,m = 100000;
    salary += allowance + perks + othIncome - (ppf + elss + lifeInsure + healthInsure + savings + hra + std + others);

    let taxableSalary = salary-n ;

    let surcharge = 0,cess = 0,tax = 0;
    
    if (salary <= 12*m){
        tax = 0;
    }else{
        //Income Tax Calculation
        salary -= n;
        let rate = 0.05;
        while(salary > 0){
            if(salary <= n){
                tax += salary*rate;
                salary -= n;
            }else{
                tax += n*rate;
                salary -= n;
            }
            
            if(rate === 0.25 && salary >0){
                tax += salary*0.3;
                break;
            }
            if(rate !== 0.25){
                rate += 0.05;
            }
        }

    //Surcharge Calculation
        if(taxableSalary >= 500*m){
            surcharge = tax*0.25;
            tax += surcharge;
        }else if(taxableSalary >= 200*m){
            surcharge = tax*0.25;
            tax += surcharge;
        }else if(taxableSalary >= 100*m){
            surcharge = tax*0.15;
            tax += surcharge;
        }else if(taxableSalary > 50*m){
            surcharge = tax*0.10;
            tax += surcharge;
        }
    // Cess Calculation
        cess = tax*0.04;
        tax += cess;
    }
    let percent = (tax/(taxableSalary+n))*100;
    ansDiv.innerHTML=`
        <div>
            <h2>Total Income : ${currencyFormatter.format(taxableSalary + n)}</h2>
            <h2>Deductions : ${currencyFormatter.format(ppf + elss + lifeInsure + healthInsure + savings + hra + std + others) }</h2>
            <h2>Taxable Income : ${currencyFormatter.format(taxableSalary)}</h2>
            <h2>SurCharge : ${currencyFormatter.format(surcharge)}</h2>
            <h2>Cess : ${currencyFormatter.format(cess)}</h2>
            <h2 style="color:lime">Tax Payable : ${currencyFormatter.format(tax)}</h2>
            <h1>${percent.toFixed(2)}% of Salary Payable</h1>
        </div>
    `;
    finalSec.appendChild(ansDiv);
})