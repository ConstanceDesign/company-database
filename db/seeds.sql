USE employees;

INSERT INTO department (name)
VALUES
('Management')
('Electrical')
('Mechanical')
('Civil')
('Accounting')
('Marketing')
('Support');

INSERT INTO role (title, department_id, salary)
VALUES
('CEO',1,350000),
('Manager',1,200000),
('Engineer',2,100000),
('Designer',2,80000),
('Engineer',3,100000),
('Designer',3,80000),
('Engineer',4,100000),
('Designer',4,80000),
('Controller',5,160000),
('Sales',6,160000),
('HR',7,70000),
('Clerical',7,40000);

INSERT INTO employee ('first_name','last_name', role_id, manager)
VALUES 
('Bruno','Bugatti',1,NULL)
('Malcolm','McLaren',1,Bugatti)
('Frank','Ferrari',1,Bugatti)
('Marco','Maseratti',1,Bugatti)
('Arnold','Anderson',2,McLaren)
('Bob','Brenner',2,McLaren)
('Celeste','Collins',3,Ferrari)
('David','Dragovich',3,Ferrari)
('Elaine','Esposito',4,Maseratti)
('Frank','Ferrari',4,Maseratti)
('Gary','Gordon',5,Bugatti)
('Harry','Harrison',6,Bugatti)
('Ishiko','Ichikawa',7,NULL)
('Jennifer','Jones',7,NULL)