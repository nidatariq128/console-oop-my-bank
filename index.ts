#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk";


console.log(chalk.magentaBright("\t","=".repeat(60)))
console.log(chalk.bgMagentaBright.bold.underline.italic("\t\t\t***** 'OOP MY BANK PROJECT' *****"))
console.log(chalk.magentaBright("\t","=".repeat(60)))

//BANK ACCOUNT INTERFACE:
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw (amount:number): void;
    deposite (amount:number): void;
    checkBlance(): void;
}

//bank account class:
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber
        this.balance = balance
    }

    //Debit mony:
    withdraw(amount: number): void {
        if(this.balance >= amount ){
            this.balance -= amount
            console.log(chalk.bgBlueBright.bold(`\nWithdrawl of $${amount} successful. Remaining balance is $${this.balance}\n`)) 
        }else{
            console.log(chalk.red("\nInsufficient balance.\n"))
            
        }
    }

    //Credit mony:
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;  // $1 fee changed if more  than $100 is deposited
        } this.balance += amount;
        console.log(chalk.bgBlueBright.bold(`\nDeposite of $${amount} successful.Remaining balance : $${this.balance}\n`))
        
    }

    //CHECK BLANCE:
    checkBalance(): void {
        console.log(chalk.bgWhiteBright.bold(`\nCurrent Balance : $${this.balance}\n`))
    }
};

//creat customer class:
class customer{
    firstName: string;
    lastName: string;
    gender:string;
    age:  number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName:string, lastName:string, gender:string, age:number, mobileNumber:number,account:BankAccount)
    {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}

//CREAT BANK ACCOUNTS:
const accounts: BankAccount[] = [
    new BankAccount (1002, 1000),
    new BankAccount (1003, 1500),
    new BankAccount (1004, 20000),
];

//CREAT CUSTOMERS
const customers: customer[] =[
    new customer ("Nida", "Tariq","Female", 25, 3126782150, accounts[0]),
    new customer ("Rabia", "Raheem","Female", 21, 313309986, accounts[1]),
    new customer ("Zainab", "Naeem","Female", 20, 3006788033, accounts[2]),
];

//creat Function to interect with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.yellowBright("\nEnter your account number :\n")
         });

         const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
         if(customer){
            console.log(chalk.bgMagentaBright(`\nWelcome, ${customer.firstName} ${customer.lastName}\n`))
            const ans = await inquirer.prompt([
                {
                name: "select",
                type: "list",
                message: "Select an operation!",
                choices: ["Deposit", "Withdraw", "Check Blance", "Exit"]
                }
            ]);

            switch (ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bgGreenBright("\nEnter the amount to deposit :\n")
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message :chalk.bgBlueBright("Enter the amount to withdraw :\n")
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
               case "Check Blance":
                            customer.account.checkBalance();
                            break;
                case "Exit":
                    console.log(chalk.redBright("\nExiting bank program..."))
                    console.log(chalk.bgMagentaBright.black("\n\t\tThank you for using our bank services.Have a great day!\n")) 
                    return;
            }
            
         }else{
            console.log(chalk.red("Invalid account number.Please try again"))
            
         }
    } while(true)
}
service()

