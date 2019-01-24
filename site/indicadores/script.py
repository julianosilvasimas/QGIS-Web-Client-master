# encoding: utf-8
# import necessary packages

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

# create message object instance
msg = MIMEMultipart()
msg2 = MIMEMultipart()
msg3 = MIMEMultipart()
message = "Acesse os seus indicadores diarios: http://172.20.68.15/indicadores/Sul.html"
message2 = "Acesse os seus indicadores diarios: http://172.20.68.15/indicadores/Prolagos.html"
message3 = "Acesse os seus indicadores diarios: http://172.20.68.15/indicadores/SaoPaulo.html"

# setup the parameters of the message
password = "Teamwork03"
me = "luiz.santos@vilavelhaambiental.com.br"
to = "mario.goncalves@serraambiental.com.br"
cc = "thais.gallina@aegea.com.br, carlos.roma@aegea.com.br, eric.maffazzioli@aegea.com.br, angelica.mattia@aguasdesfs.com.br, alvaro.alvarenga@aegea.com.br, jj.fonseca@aegea.com.br, joao.aquino@aegea.com.br, jose.ferreira@aegea.com.br, gabriel.buim@aguasdecamboriu.com.br, gabriel.fasola@aguasdecamboriu.com.br, jader.santos@aguasbombinhas.com.br, guilherme.bueno@aguasdepenha.com.br, matheus.silva@aegea.com.br, simone.callado@aguasdecamboriu.com.br"
bcc = "luiz.santos@vilavelhaambiental.com.br"
rcpt = cc.split(",") + bcc.split(",") + [to]

msg['Subject'] = "Indicadores"
msg['To'] = to
msg['Cc'] = cc
msg['Bcc'] = bcc
msg.attach(MIMEText(message, 'plain'))

server = smtplib.SMTP("correio.level3br.com:587")
server.starttls()
server.login(me,password)
server.sendmail(me, rcpt, msg.as_string())
server.quit()

# setup the parameters of the message 2
password = "Teamwork03"
me = "luiz.santos@vilavelhaambiental.com.br"
to = "mario.goncalves@serraambiental.com.br"
cc2 = "marcos.dearaujo@aegea.com.br, sergio.braga@prolagos.com.br, aline.povoas@prolagos.com.br, alvaro.alvarenga@aegea.com.br, jj.fonseca@aegea.com.br, joao.aquino@aegea.com.br, jose.ferreira@aegea.com.br, wellyngthon.ferreira@prolagos.com.br, douglas.barbosa@prolagos.com.br, marcus.silva@serraambiental.com.br, jose.almeida@prolagos.com.br, alessandra.costa@prolagos.com.br, adriana.reis@prolagos.com.br, plinio.paiva@prolagos.com.br, isabele.lira@prolagos.com.br, vitor.heser@prolagos.com.br, mauro.chimenez@prolagos.com.br, keila.silva@prolagos.com.br" #mario.goncalves@serraambiental.com.br
bcc2 = "luiz.santos@vilavelhaambiental.com.br"
rcpt2 = cc2.split(",") + bcc2.split(",") + [to]

msg2['Subject'] = "Indicadores"
msg2['To'] = to
msg2['Cc'] = cc2
msg2['Bcc'] = bcc2
msg2.attach(MIMEText(message2, 'plain'))

server = smtplib.SMTP("correio.level3br.com:587")
server.starttls()
server.login(me,password)
server.sendmail(me, rcpt2, msg2.as_string())
server.quit()

# setup the parameters of the message 3
password = "Teamwork03"
me = "luiz.santos@vilavelhaambiental.com.br"
to = "mario.goncalves@serraambiental.com.br"
cc3 = "fernando.humphreys@aegea.com.br, alexandre.antonio@aegea.com.br, luiz.batisteli@aguasdomirante.com.br, alvaro.alvarenga@aegea.com.br, jj.fonseca@aegea.com.br, joao.aquino@aegea.com.br, jose.ferreira@aegea.com.br, vitor.gabriel@aguasdomirante.com.br, marcos.antunes@aguasdeholambra.com.br, valdir.junior@aguasdomirante.com.br, alan.pedra@aguasdomirante.com.br, fabio.rodrigues@aguasdomirante.com.br" #mario.goncalves@serraambiental.com.br
bcc3 = "luiz.santos@vilavelhaambiental.com.br"
rcpt3 = cc3.split(",") + bcc3.split(",") + [to]

msg3['Subject'] = "Indicadores"
msg3['To'] = to
msg3['Cc'] = cc3
msg3['Bcc'] = bcc3
msg3.attach(MIMEText(message3, 'plain'))

server = smtplib.SMTP("correio.level3br.com:587")
server.starttls()
server.login(me,password)
server.sendmail(me, rcpt3, msg3.as_string())
server.quit()

print ("successfully sent email")
