use employees;

insert into department(name)
values ('ceo')('management')('electrical')('mechanical')('civil')('accounting')('support')

insert into role(title, role_id, department, salary)
values ("ceo",1,'management',350000,)("manager",2,'management',250000,)('engineer',3,'electrical',100000,)('designer',4,'electrical',60000,)('engineer',5,'mechanical',90000,)('designer',5,'mechanical',70000,)('engineer',6,'civil',70000,)('designer',7,'civil',90000,)('controller',8,'accounting'100000,)('hr',9,'support',70000,)('clerical',10,'support',40000,)

insert into employee ('first_name','last_name', role_id, manager)
values ("Bruno","Bugatti",1,null)("Malcolm","McLaren",1,Bugatti)("Frank","Ferrari",1,Bugatti)("Marco","Maseratti",1,Bugatti)("Ann","Anderson",7,Ferrari)("Bob","Brenner",2,Ferrari)("Celeste","Collins",4,Ferrari)("David","Dragovich",6,Ferrari)("Elaine","Esposito",5,Ferrari)("Frank","Ferrari",1)("Gary","Gordon",10,Ferrari)("Hailey","Harrison",8,Ferrari)("Ishiko","Ichikawa",3,Ferrari)("Jennifer","Jones",9,Ferrari)